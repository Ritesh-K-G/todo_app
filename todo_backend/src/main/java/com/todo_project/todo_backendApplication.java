package com.todo_project;

import com.todo_project.api.Route;
import io.dropwizard.Application;
import io.dropwizard.setup.Environment;

import java.sql.Connection;
import java.sql.DriverManager;

import org.hibernate.SessionFactory;

public class todo_backendApplication extends Application<todo_backendConfiguration> {

    public static void main(String[] args) throws Exception {
        new todo_backendApplication().run(args);
    }

    @Override
    public void run(todo_backendConfiguration configuration, Environment environment) {
        String url = configuration.getDatabaseUrl();
        String user = configuration.getDatabaseUser();
        String password = configuration.getDatabasePassword();

        try (Connection connection = DriverManager.getConnection(url, user, password)) {
            System.out.println("Successfully connected to the database!");
        } catch (Exception e) {
            System.err.println("Failed to connect to the database:");
            e.printStackTrace();
        }
        Route route = new Route();
        environment.jersey().register(route);
//        final SessionFactory sessionFactory = new HibernateBundle<>(TestEntity.class).getSessionFactory();
//        final TestEntityDAO testEntityDAO = new TestEntityDAO(sessionFactory);
//
//        environment.jersey().register(new TestEntityResource(testEntityDAO));
    }
}
