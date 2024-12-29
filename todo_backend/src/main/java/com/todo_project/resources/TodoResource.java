package com.todo_project.resources;

import com.todo_project.dao.TodoDAO;
import com.todo_project.models.Todo;
import io.dropwizard.hibernate.UnitOfWork;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/todos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TodoResource {
    private final TodoDAO todoDAO;

    public TodoResource(TodoDAO todoDAO) {
        this.todoDAO = todoDAO;
    }

    @GET
    @UnitOfWork
    public List<Todo> getTodos() {
        return todoDAO.findAll();
    }

    @POST
    @UnitOfWork
    public Response createTodo(Todo todo) {
        Todo createdTodo = todoDAO.create(todo);
        return Response.status(Response.Status.CREATED).entity(createdTodo).build();
    }

    @GET
    @Path("/{id}")
    @UnitOfWork
    public Todo getTodoById(@PathParam("id") long id) {
        return todoDAO.findById(id);
    }

    @DELETE
    @Path("/{id}")
    @UnitOfWork
    public Response deleteTodoById(@PathParam("id") long id) {
        Todo todo = todoDAO.findById(id);
        if (todo != null) {
            todoDAO.deleteTodo(todo);
            return Response.status(Response.Status.OK).build();
        }
        return Response.status(Response.Status.NO_CONTENT).build();
    }

    @PATCH
    @UnitOfWork
    public Response updateTodoTask(Todo todo) {
        Todo existingTodo = todoDAO.findById(todo.getId());
        if (existingTodo != null) {
            todoDAO.updateTodo(existingTodo, todo);
            return Response.status(Response.Status.OK).build();
        }
        return Response.status(Response.Status.NO_CONTENT).build();
    }

    @Path("/{id}/markWIP")
    @PATCH
    @UnitOfWork
    public Response markTodoWIP(@PathParam("id") long id) {
        Todo todo = todoDAO.findById(id);
        if (todo != null) {
            todoDAO.moveToWIP(todo);
            return Response.status(Response.Status.OK).build();
        }
        return Response.status(Response.Status.NO_CONTENT).build();
    }

    @Path("/{id}/markDone")
    @PATCH
    @UnitOfWork
    public Response markTodoDone(@PathParam("id") long id) {
        Todo todo = todoDAO.findById(id);
        if (todo != null) {
            todoDAO.markDone(todo);
            return Response.status(Response.Status.OK).build();
        }
        return Response.status(Response.Status.NO_CONTENT).build();
    }

    @Path("/{id}/moveToBin")
    @PATCH
    @UnitOfWork
    public Response moveIntoBin(@PathParam("id") long id) {
        Todo todo = todoDAO.findById(id);
        if (todo != null) {
            todoDAO.moveToBin(todo);
            return Response.status(Response.Status.OK).build();
        }
        return Response.status(Response.Status.NO_CONTENT).build();
    }

    @Path("/{id}/restoreFromBin")
    @PATCH
    @UnitOfWork
    public Response restoreFromTheBin(@PathParam("id") long id) {
        Todo todo = todoDAO.findById(id);
        if (todo != null) {
            todoDAO.restoreFromBin(todo);
            return Response.status(Response.Status.OK).build();
        }
        return Response.status(Response.Status.NO_CONTENT).build();
    }
}
