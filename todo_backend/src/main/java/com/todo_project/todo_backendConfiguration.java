package com.todo_project;

import io.dropwizard.Configuration;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;

public class todo_backendConfiguration extends Configuration {

    @NotNull
    private String databaseUrl;

    @NotNull
    private String databaseUser;

    @NotNull
    private String databasePassword;

    @JsonProperty("database")
    public void setDatabase(DatabaseConfig database) {
        this.databaseUrl = database.getUrl();
        this.databaseUser = database.getUser();
        this.databasePassword = database.getPassword();
    }

    public String getDatabaseUrl() {
        return databaseUrl;
    }

    public String getDatabaseUser() {
        return databaseUser;
    }

    public String getDatabasePassword() {
        return databasePassword;
    }

    public static class DatabaseConfig {
        private String url;
        private String user;
        private String password;

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }

        public String getUser() {
            return user;
        }

        public void setUser(String user) {
            this.user = user;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
