package com.todo_project.dao;

import com.todo_project.models.Progress;
import com.todo_project.models.Todo;
import com.todo_project.utils.Status;
import io.dropwizard.hibernate.AbstractDAO;
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
        String sql = "DELETE FROM todos WHERE id = :id";
        currentSession().createNativeQuery(sql)
                .setParameter("id", todo.getId())
                .executeUpdate();
    }

    public void updateTodo(Todo existingTodo, Todo todo) {
        existingTodo.setTitle(todo.getTitle());
        existingTodo.setDescription(todo.getDescription());
        existingTodo.setStartTime(todo.getStartTime());
        existingTodo.setEndTime(todo.getEndTime());
        existingTodo.addProgress(Status.UPDATED);
        persist(existingTodo);
    }

    public void moveToWIP(Todo todo) {
        todo.setStatus(Status.WIP);
        todo.addProgress(todo.getStatus());
        persist(todo);
    }

    public void markDone(Todo todo) {
        todo.setStatus(Status.DONE);
        todo.addProgress(todo.getStatus());
        persist(todo);
    }

    public void moveToBin(Todo todo) {
        todo.setStatus(Status.DELETED);
        persist(todo);
    }

    public void restoreFromBin(Todo todo) {
        List<Progress> progresses = todo.getProgress();
        Status lastProgress = progresses.get(progresses.size() - 1).getStatus();
        todo.setStatus(lastProgress);
        persist(todo);
    }
}