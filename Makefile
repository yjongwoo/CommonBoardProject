tests:
	tput setaf 1; echo 'Backend:' && \
	tput sgr0; make -C backend tests 2>&1 | grep -A 2 'actionable tasks' && \
	tput setaf 1; echo 'Frontend:' && \
    tput sgr0; make -C frontend tests 2>&1 | grep 'Tests:'
