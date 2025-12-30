#!/bin/bash

# Script to run OrangeHRM Playwright tests

echo "=========================================="
echo "Running OrangeHRM Playwright Test Suite"
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Install Playwright browsers if not already installed
echo "Ensuring Playwright browsers are installed..."
npx playwright install --with-deps chromium

# Run tests
echo "Running all tests..."
npm run test

echo "=========================================="
echo "Test execution completed!"
echo "=========================================="
echo "View HTML report: npm run test:report"


