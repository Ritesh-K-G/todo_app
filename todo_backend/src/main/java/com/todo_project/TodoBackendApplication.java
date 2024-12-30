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
import org.eclipse.jetty.servlets.CrossOriginFilter;

import javax.servlet.DispatcherType;
import javax.servlet.FilterRegistration;
import java.util.EnumSet;


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

        final FilterRegistration.Dynamic cors =
                environment.servlets().addFilter("CORS", CrossOriginFilter.class);

        // Configure CORS parameters
        cors.setInitParameter(CrossOriginFilter.ALLOWED_ORIGINS_PARAM, "*"); // Allow all origins
        cors.setInitParameter(CrossOriginFilter.ALLOWED_HEADERS_PARAM, "X-Requested-With,Content-Type,Accept,Origin,Authorization");
        cors.setInitParameter(CrossOriginFilter.ALLOWED_METHODS_PARAM, "OPTIONS,GET,PUT,POST,DELETE,HEAD");
        cors.setInitParameter(CrossOriginFilter.ALLOW_CREDENTIALS_PARAM, "true");

        // Add URL mapping
        cors.addMappingForUrlPatterns(EnumSet.allOf(DispatcherType.class), true, "/*");
    }
}
