package com.todo_project.validators;

import com.todo_project.models.Todo;
import com.todo_project.utils.Status;

import java.time.LocalDateTime;

public class CustomValidator {

    private CustomValidator() {}

    public static boolean checkValidDates(LocalDateTime start, LocalDateTime end) {
        return start.isBefore(end);
    }

    public static boolean validTodo(Todo todo) {
        return (!todo.getTitle().isEmpty() &&
                !todo.getDescription().isEmpty() &&
                todo.getStartTime() != null &&
                todo.getEndTime() != null &&
                checkValidDates(todo.getStartTime(), todo.getEndTime()));
    }

    public static boolean validForWIP(Status status) {
        return (status != Status.DELETED && status != Status.WIP && status != Status.DONE);
    }

    public static boolean validForDone(Status status) {
        return status == Status.WIP;
    }

    public static boolean validForBin(Status status) {
        return status != Status.DELETED;
    }

    public static boolean validForRestore(Status status) {
        return status == Status.DELETED;
    }
}
