package com.todo_project;

import org.hibernate.SessionFactory;
import io.dropwizard.hibernate.UnitOfWork;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/todos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TodoResource {

    private final SessionFactory sessionFactory;

    public TodoResource(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @GET
    @UnitOfWork
    public List<Todo> getTodos() {
        return sessionFactory.getCurrentSession().createQuery("from Todo", Todo.class).list();
    }

    @POST
    @UnitOfWork
    public Response createTodo(Todo todo) {
        sessionFactory.getCurrentSession().save(todo);
        return Response.status(Response.Status.CREATED).entity(todo).build();
    }

    @GET
    @Path("/{id}")
    @UnitOfWork
    public Todo getTodoById(@PathParam("id") long id) {
        return sessionFactory.getCurrentSession().get(Todo.class, id);
    }

    @DELETE
    @Path("/{id}")
    @UnitOfWork
    public Response deleteTodoById(@PathParam("id") long id) {
        Todo todo = sessionFactory.getCurrentSession().get(Todo.class, id);
        if (todo != null) {
            sessionFactory.getCurrentSession().delete(todo);
            return Response.status(Response.Status.NO_CONTENT).build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }
}
