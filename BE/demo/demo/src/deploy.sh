#!/bin/bash

# Change to the directory where your backend code is located
# shellcheck disable=SC2164
cd /app

# Build the Spring Boot application using Gradle
./gradlew build

# Run the Spring Boot application
java -jar build/libs/demo-0.0.1-SNAPSHOT.jar