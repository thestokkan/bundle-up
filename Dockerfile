FROM node:16.14 as frontend
WORKDIR /frontend
COPY app .
RUN npm ci
RUN npm run build

FROM maven:3.8.6-eclipse-temurin-17 as backend
WORKDIR /backend
COPY . .
RUN mkdir -p src/main/resources/static
COPY --from=frontend /frontend/build src/main/resources/static
RUN mvn clean verify

FROM openjdk:17-slim
COPY --from=backend /backend/target/bundle-up-0.0.1-SNAPSHOT.jar /app/
EXPOSE 8080
CMD ["java", "-jar", "/app/app-0.0.1-SNAPSHOT.jar"]