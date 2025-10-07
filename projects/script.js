class TodoManager {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.bindEvents();
        this.render();
        this.updateStats();
        
        // Initial animation
        gsap.from('.container', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });
    }

    bindEvents() {
        // Form submission
        document.getElementById('todo-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTodo();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Clear actions
        document.getElementById('clear-completed').addEventListener('click', () => {
            this.clearCompleted();
        });

        document.getElementById('clear-all').addEventListener('click', () => {
            this.clearAll();
        });

        // Auto-save on page unload
        window.addEventListener('beforeunload', () => {
            this.saveTodos();
        });
    }

    addTodo() {
        const input = document.getElementById('todo-input');
        const prioritySelect = document.getElementById('priority-select');
        const dueDateInput = document.getElementById('due-date');
        
        const text = input.value.trim();
        if (!text) return;

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            priority: prioritySelect.value,
            dueDate: dueDateInput.value || null,
            createdAt: new Date().toISOString(),
            completedAt: null
        };

        this.todos.unshift(todo);
        
        // Clear form
        input.value = '';
        dueDateInput.value = '';
        prioritySelect.value = 'medium';

        this.saveTodos();
        this.render();
        this.updateStats();

        // Animate new todo
        const todoElement = document.querySelector(`[data-id="${todo.id}"]`);
        if (todoElement) {
            gsap.from(todoElement, {
                duration: 0.5,
                x: -50,
                opacity: 0,
                scale: 0.9,
                ease: 'back.out(1.7)'
            });
        }
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        todo.completed = !todo.completed;
        todo.completedAt = todo.completed ? new Date().toISOString() : null;

        const todoElement = document.querySelector(`[data-id="${id}"]`);
        
        if (todo.completed) {
            // Completion animation
            gsap.to(todoElement, {
                duration: 0.3,
                scale: 1.05,
                ease: 'power2.out',
                onComplete: () => {
                    gsap.to(todoElement, {
                        duration: 0.2,
                        scale: 1,
                        ease: 'power2.out'
                    });
                }
            });
            
            // Strike-through animation
            const textElement = todoElement.querySelector('.todo-text');
            gsap.to(textElement, {
                duration: 0.5,
                opacity: 0.6,
                ease: 'power2.out'
            });
        } else {
            // Uncomplete animation
            const textElement = todoElement.querySelector('.todo-text');
            gsap.to(textElement, {
                duration: 0.3,
                opacity: 1,
                ease: 'power2.out'
            });
        }

        this.saveTodos();
        this.render();
        this.updateStats();
    }

    deleteTodo(id) {
        const todoElement = document.querySelector(`[data-id="${id}"]`);
        
        // Delete animation
        gsap.to(todoElement, {
            duration: 0.4,
            x: 100,
            opacity: 0,
            scale: 0.8,
            ease: 'power2.in',
            onComplete: () => {
                this.todos = this.todos.filter(t => t.id !== id);
                this.saveTodos();
                this.render();
                this.updateStats();
            }
        });
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.render();
    }

    clearCompleted() {
        const completedTodos = this.todos.filter(t => t.completed);
        
        if (completedTodos.length === 0) return;
        
        // Animate out completed todos
        completedTodos.forEach((todo, index) => {
            const todoElement = document.querySelector(`[data-id="${todo.id}"]`);
            if (todoElement) {
                gsap.to(todoElement, {
                    duration: 0.3,
                    delay: index * 0.1,
                    x: 100,
                    opacity: 0,
                    scale: 0.8,
                    ease: 'power2.in'
                });
            }
        });

        setTimeout(() => {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveTodos();
            this.render();
            this.updateStats();
        }, 500);
    }

    clearAll() {
        if (this.todos.length === 0) return;
        
        if (confirm('Are you sure you want to delete all tasks?')) {
            // Animate out all todos
            this.todos.forEach((todo, index) => {
                const todoElement = document.querySelector(`[data-id="${todo.id}"]`);
                if (todoElement) {
                    gsap.to(todoElement, {
                        duration: 0.3,
                        delay: index * 0.05,
                        y: -50,
                        opacity: 0,
                        scale: 0.8,
                        ease: 'power2.in'
                    });
                }
            });

            setTimeout(() => {
                this.todos = [];
                this.saveTodos();
                this.render();
                this.updateStats();
            }, 500);
        }
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            case 'high':
                return this.todos.filter(t => t.priority === 'high');
            default:
                return this.todos;
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = date - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) {
            return { text: `Overdue by ${Math.abs(diffDays)} day(s)`, class: 'overdue' };
        } else if (diffDays === 0) {
            return { text: 'Due today', class: 'due-soon' };
        } else if (diffDays === 1) {
            return { text: 'Due tomorrow', class: 'due-soon' };
        } else if (diffDays <= 3) {
            return { text: `Due in ${diffDays} days`, class: 'due-soon' };
        } else {
            return { text: date.toLocaleDateString(), class: '' };
        }
    }

    render() {
        const todoList = document.getElementById('todo-list');
        const emptyState = document.getElementById('empty-state');
        const filteredTodos = this.getFilteredTodos();

        if (filteredTodos.length === 0) {
            todoList.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';
        
        todoList.innerHTML = filteredTodos.map(todo => {
            const createdDate = new Date(todo.createdAt).toLocaleString();
            const dueInfo = todo.dueDate ? this.formatDate(todo.dueDate) : null;
            
            return `
                <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                    <div class="priority-indicator priority-${todo.priority}"></div>
                    <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" onclick="todoManager.toggleTodo(${todo.id})">
                        ${todo.completed ? '<i class="fas fa-check"></i>' : ''}
                    </div>
                    <div class="todo-content">
                        <div class="todo-text">${todo.text}</div>
                        <div class="todo-meta">
                            <span class="meta-item">
                                <i class="fas fa-clock"></i>
                                Created: ${createdDate}
                            </span>
                            <span class="meta-item">
                                <i class="fas fa-flag"></i>
                                ${todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} Priority
                            </span>
                            ${dueInfo ? `
                                <span class="meta-item ${dueInfo.class}">
                                    <i class="fas fa-calendar"></i>
                                    ${dueInfo.text}
                                </span>
                            ` : ''}
                        </div>
                    </div>
                    <div class="todo-actions">
                        <button class="action-icon delete-btn" onclick="todoManager.deleteTodo(${todo.id})" title="Delete task">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </li>
            `;
        }).join('');
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const active = total - completed;

        document.getElementById('total-count').textContent = total;
        document.getElementById('active-count').textContent = active;
        document.getElementById('completed-count').textContent = completed;

        // Animate counter updates
        gsap.from('#total-count, #active-count, #completed-count', {
            duration: 0.3,
            scale: 1.2,
            ease: 'power2.out'
        });
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}

// Initialize the todo manager
const todoManager = new TodoManager();

// Add some sample data if no todos exist
if (todoManager.todos.length === 0) {
    const sampleTodos = [
        {
            id: 1,
            text: "Welcome to your Advanced Todo Manager!",
            completed: false,
            priority: "high",
            dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
            createdAt: new Date().toISOString(),
            completedAt: null
        },
        {
            id: 2,
            text: "Try marking this task as complete",
            completed: false,
            priority: "medium",
            dueDate: null,
            createdAt: new Date().toISOString(),
            completedAt: null
        }
    ];
    
    todoManager.todos = sampleTodos;
    todoManager.saveTodos();
    todoManager.render();
    todoManager.updateStats();
}