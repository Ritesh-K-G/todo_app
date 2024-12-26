package com.todo_project;

import com.todo_project.api.Route;
import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

public class todo_backendApplication extends Application<todo_backendConfiguration> {

    public static void main(final String[] args) throws Exception {
        new todo_backendApplication().run(args);
    }

    @Override
    public String getName() {
        return "todo_backend";
    }

    @Override
    public void initialize(final Bootstrap<todo_backendConfiguration> bootstrap) {
        // TODO: application initialization
    }

    @Override
    public void run(final todo_backendConfiguration configuration,
                    final Environment environment) {
        // TODO: implement application
        Route route = new Route();environment.jersey().register(route);
    }

}
