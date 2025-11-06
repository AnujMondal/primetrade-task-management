#!/bin/bash

# PrimeTrade Setup Script
# This script automates the setup process for both frontend and backend

echo "🚀 Starting PrimeTrade Setup..."
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check if Node.js is installed
echo ""
print_info "Checking prerequisites..."

if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
print_success "Node.js is installed: $NODE_VERSION"

if ! command -v npm &> /dev/null; then
    print_error "npm is not installed"
    exit 1
fi

NPM_VERSION=$(npm -v)
print_success "npm is installed: $NPM_VERSION"

# Check if MongoDB is running (optional)
if command -v mongod &> /dev/null; then
    print_success "MongoDB is installed"
    if pgrep -x "mongod" > /dev/null; then
        print_success "MongoDB is running"
    else
        print_info "Starting MongoDB..."
        if [[ "$OSTYPE" == "darwin"* ]]; then
            brew services start mongodb-community &> /dev/null
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            sudo systemctl start mongod &> /dev/null
        fi
        
        if pgrep -x "mongod" > /dev/null; then
            print_success "MongoDB started successfully"
        else
            print_error "Could not start MongoDB"
            print_info "You can use MongoDB Atlas (cloud) instead"
        fi
    fi
else
    print_info "MongoDB not found locally - you can use MongoDB Atlas"
fi

# Setup Backend
echo ""
echo "📦 Setting up Backend..."
echo "========================"

cd backend

if [ ! -f "package.json" ]; then
    print_error "Backend package.json not found"
    exit 1
fi

print_info "Installing backend dependencies..."
npm install

if [ $? -eq 0 ]; then
    print_success "Backend dependencies installed"
else
    print_error "Failed to install backend dependencies"
    exit 1
fi

if [ ! -f ".env" ]; then
    print_info "Creating .env file..."
    cp .env.example .env
    print_success ".env file created"
else
    print_success ".env file already exists"
fi

# Setup Frontend
echo ""
echo "🎨 Setting up Frontend..."
echo "========================"

cd ../frontend

if [ ! -f "package.json" ]; then
    print_error "Frontend package.json not found"
    exit 1
fi

print_info "Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    print_success "Frontend dependencies installed"
else
    print_error "Failed to install frontend dependencies"
    exit 1
fi

if [ ! -f ".env" ]; then
    print_info "Creating .env file..."
    cp .env.example .env
    print_success ".env file created"
else
    print_success ".env file already exists"
fi

# Go back to root
cd ..

# Setup complete
echo ""
echo "================================"
print_success "Setup completed successfully!"
echo "================================"
echo ""

# Instructions
echo "📋 Next Steps:"
echo ""
echo "1. Start the Backend:"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "2. In a new terminal, start the Frontend:"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "3. Open your browser to:"
echo "   http://localhost:3000"
echo ""
echo "4. Create an account and start using PrimeTrade!"
echo ""
echo "📚 Documentation:"
echo "   - README.md        - Complete documentation"
echo "   - SETUP.md         - Setup guide"
echo "   - SCALABILITY.md   - Scaling guide"
echo ""
echo "🆘 Need help? Check SETUP.md for troubleshooting"
echo ""

# Ask if user wants to start servers
read -p "Would you like to start the servers now? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_info "Starting Backend server..."
    
    # Start backend in background
    cd backend
    npm run dev &
    BACKEND_PID=$!
    
    # Wait a bit for backend to start
    sleep 3
    
    print_info "Starting Frontend server..."
    
    # Start frontend in background
    cd ../frontend
    npm start &
    FRONTEND_PID=$!
    
    echo ""
    print_success "Servers started!"
    echo ""
    echo "Backend PID: $BACKEND_PID"
    echo "Frontend PID: $FRONTEND_PID"
    echo ""
    echo "To stop the servers:"
    echo "kill $BACKEND_PID $FRONTEND_PID"
    echo ""
    echo "Or press Ctrl+C and then run:"
    echo "pkill -f 'node.*backend' && pkill -f 'node.*frontend'"
    echo ""
    
    # Wait for user interrupt
    wait
else
    print_info "You can start the servers manually later"
    echo ""
    echo "Backend: cd backend && npm run dev"
    echo "Frontend: cd frontend && npm start"
fi
