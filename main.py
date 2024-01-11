class Task:
    def __init__(self, name):
        self.name = name
        self.description = None
        self.priority = None

tasks = []

def createTask():
    taskName = input("Enter task name: ")
    
    newTask = Task(taskName)
    
    newTask.description = input("Describe the task: ")
    newTask.priority = input("Enter task priority: ")
    
    return newTask

def deleteTask():
    task = int(input("Ange vilken uppgift du vill ta bort(nummer): "))
    if task < len(task):
        print(f"Lyckades radera '{task}'")

if __name__ == '__main__':
    print("Välkommen till TaskPro, din enda uppgifts hanterare.\n")
    while True:
        print("Var vänlig och välj en av följande alternativ")
        print("1. Skapa en uppgift")
        print("2. Visa alla uppgifter")
        print("3. Radera en uppgift")
        print("4. Avsluta")
    
        val = input("Ange ditt val: ")

        if val == "1":
            tasks.append(createTask())
        elif val == "2":
            showPlans()
        elif val == "3":
            deleteTask()
        elif val == "4":
            break
        else: 
            print("Du valde inget av alternativen, avslutar program")
            break


print("Task Name:", tasks[0].name)
print("Task Description:", tasks[0].description)
print("Task Priority:", tasks[0].priority)