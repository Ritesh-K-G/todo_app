package com.todo_project;

import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import java.util.List;

public class TodoDAO extends AbstractDAO<Todo> {

    public TodoDAO(SessionFactory sessionFactory) {
        super(sessionFactory);
    }

    public Todo findById(Long id) {
        return get(id);
    }

    public List<Todo> findAll() {
        return list((Criteria) namedQuery("Todo.findAll"));
    }

    public Todo create(Todo todo) {
        return persist(todo);
    }
}

