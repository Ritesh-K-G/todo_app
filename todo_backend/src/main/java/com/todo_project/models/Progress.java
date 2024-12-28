package com.todo_project.models;

import com.todo_project.utils.Status;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "progress")
public class Progress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JoinColumn(name = "todo_id", nullable = false)
    private long todo_id;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDateTime timestamp;

    public Progress() {
        this.status = Status.CREATED;
    }

    public Progress(Status status, LocalDateTime timestamp, long todo) {
        this.status = status;
        this.timestamp = timestamp;
        this.todo_id = todo;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public long getTodo_id() {
        return todo_id;
    }

    public void setTodo_id(long todo) {
        this.todo_id = todo;
    }
}

