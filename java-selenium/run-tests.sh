#!/bin/bash

# Script to run OrangeHRM tests

echo "=========================================="
echo "Running OrangeHRM Test Suite"
echo "=========================================="

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "Error: Maven is not installed. Please install Maven first."
    exit 1
fi

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "Error: Java is not installed. Please install Java 11 or higher."
    exit 1
fi

# Run tests
echo "Running all tests..."
mvn clean test

echo "=========================================="
echo "Test execution completed!"
echo "=========================================="

