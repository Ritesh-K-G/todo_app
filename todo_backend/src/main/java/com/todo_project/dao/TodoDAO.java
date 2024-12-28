package com.todo_project.dao;

import com.todo_project.models.Todo;
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
        return currentSession().createQuery("from Todo", Todo.class).list();
    }

    public Todo create(Todo todo) {
        Todo persistedTodo = persist(todo);
        persistedTodo.addProgress(todo.getStatus());
        return persistedTodo;
    }

    public void deleteTodo(Todo todo) {
        currentSession().delete(todo);
    }
}