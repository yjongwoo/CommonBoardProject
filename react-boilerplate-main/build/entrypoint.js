const inquirer = require('inquirer')
const { getExecutablePromise, runSyncPromises } = require('./runner')

inquirer
  .prompt([
    {
      type: 'list',
      name: 'task',
      message: '\n[실행할 작업 선택]\n',
      choices: [
        {
          name: '테스트',
          value: 'test',
        },
        {
          name: '로컬 빌드',
          value: 'local',
        },
        {
          name: '프로덕션 빌드',
          value: 'production',
        },
        {
          name: '커밋 준비',
          value: 'prepare',
        },
      ],
    },
  ])
  .then(async ({ task }) => {
    const commands = []

    switch (task) {
      case 'test':
        const { options } = await inquirer.prompt([
          {
            type: 'checkbox',
            name: 'options',
            message: '\n[테스트 옵션 선택]\n',
            choices: [
              { name: '테스트 워치', value: '--watchAll' },
              { name: '테스트 커버리지', value: '--coverage' },
            ],
          },
        ])
        commands.push(getExecutablePromise(task, ['yarn', 'test'], options))
        break
      case 'local':
        commands.push(getExecutablePromise(task, ['yarn', 'dev']))
        break
      case 'production':
        commands.push(getExecutablePromise(task, ['yarn', 'build']))
        const { subtask } = await inquirer.prompt([
          {
            type: 'list',
            name: 'subtask',
            message: '\n[미리보기 옵션 선택]\n',
            choices: [
              {
                name: '미리보기',
                value: 'preview',
              },
              {
                name: '없음',
                value: 'no-preview',
              },
            ],
          },
        ])
        if (subtask === 'preview') {
          commands.push(getExecutablePromise(subtask, ['yarn', 'serve']))
        }
        break
      case 'prepare':
        commands.push(getExecutablePromise(task, ['yarn', 'lint']))
        commands.push(getExecutablePromise(task, ['yarn', 'test'], ['--coverage']))
        break
      default:
        break
    }

    await runSyncPromises(commands)
  })
