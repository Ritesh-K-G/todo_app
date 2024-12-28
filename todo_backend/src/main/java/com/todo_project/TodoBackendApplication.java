package com.todo_project;

import com.todo_project.models.Todo;
import com.todo_project.models.Progress;
import com.todo_project.resources.TodoResource;
import com.todo_project.dao.TodoDAO;
import io.dropwizard.Application;
import io.dropwizard.db.DataSourceFactory;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.hibernate.SessionFactory;
import io.dropwizard.hibernate.HibernateBundle;
import io.dropwizard.Configuration;

public class TodoBackendApplication extends Application<TodoBackendConfiguration> {

    private final HibernateBundle<TodoBackendConfiguration> hibernateBundle =
            new HibernateBundle<TodoBackendConfiguration>(Todo.class, Progress.class) {
                @Override
                public DataSourceFactory getDataSourceFactory(TodoBackendConfiguration configuration) {
                    return configuration.getDataSourceFactory();
                }
            };

    public static void main(String[] args) throws Exception {
        new TodoBackendApplication().run(args);
    }

    @Override
    public String getName() {
        return "todo-backend";
    }

    @Override
    public void initialize(Bootstrap<TodoBackendConfiguration> bootstrap) {
        bootstrap.addBundle(hibernateBundle);
    }

    @Override
    public void run(TodoBackendConfiguration configuration, Environment environment) {
        final SessionFactory sessionFactory = hibernateBundle.getSessionFactory();
        final TodoDAO todoDAO = new TodoDAO(sessionFactory);
        final TodoResource todoResource = new TodoResource(todoDAO);
        environment.jersey().register(todoResource);
    }
}
