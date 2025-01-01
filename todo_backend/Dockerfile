FROM maven:3.9.2-eclipse-temurin-17 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean install

FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/target/todo-backend-1.0-SNAPSHOT.jar /app/
COPY config.yml /app/

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

EXPOSE 8080

CMD ["/app/wait-for-it.sh", "mariadb:3306", "--", "java", "-jar", "todo-backend-1.0-SNAPSHOT.jar", "server", "config.yml"]