package com.example.backend;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

public class SpyPostRepository implements PostRepository {
    private boolean isGetAllPostsCalled = false;

    public boolean getIsGetAllPostsCalled() {
        return isGetAllPostsCalled;
    }

    @Override
    public List<PostEntity> findAll() {
        isGetAllPostsCalled = true;
        return Collections.emptyList();
    }

    @Override
    public List<PostEntity> findAll(Sort sort) {
        return null;
    }

    @Override
    public Page<PostEntity> findAll(Pageable pageable) {
        return null;
    }

    @Override
    public List<PostEntity> findAllById(Iterable<Long> longs) {
        return null;
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void deleteById(Long aLong) {

    }

    @Override
    public void delete(PostEntity entity) {

    }

    @Override
    public void deleteAllById(Iterable<? extends Long> longs) {

    }

    @Override
    public void deleteAll(Iterable<? extends PostEntity> entities) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public <S extends PostEntity> S save(S entity) {
        return null;
    }

    @Override
    public <S extends PostEntity> List<S> saveAll(Iterable<S> entities) {
        return null;
    }

    @Override
    public Optional<PostEntity> findById(Long aLong) {
        return Optional.empty();
    }

    @Override
    public boolean existsById(Long aLong) {
        return false;
    }

    @Override
    public void flush() {

    }

    @Override
    public <S extends PostEntity> S saveAndFlush(S entity) {
        return null;
    }

    @Override
    public <S extends PostEntity> List<S> saveAllAndFlush(Iterable<S> entities) {
        return null;
    }

    @Override
    public void deleteAllInBatch(Iterable<PostEntity> entities) {

    }

    @Override
    public void deleteAllByIdInBatch(Iterable<Long> longs) {

    }

    @Override
    public void deleteAllInBatch() {

    }

    @Override
    public PostEntity getOne(Long aLong) {
        return null;
    }

    @Override
    public PostEntity getById(Long aLong) {
        return null;
    }

    @Override
    public <S extends PostEntity> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends PostEntity> List<S> findAll(Example<S> example) {
        return null;
    }

    @Override
    public <S extends PostEntity> List<S> findAll(Example<S> example, Sort sort) {
        return null;
    }

    @Override
    public <S extends PostEntity> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends PostEntity> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends PostEntity> boolean exists(Example<S> example) {
        return false;
    }

    @Override
    public <S extends PostEntity, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return null;
    }
}
