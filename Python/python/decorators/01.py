# # Definition of a decorator in Python
# def my_decorator(func):
#     def wrapper(*args, **kwargs):
#         print("Something is happening before the function is called.")
#         result = func(*args, **kwargs)
#         print("Something is happening after the function is called.")
#         return result
#     return wrapper

# # Sample usage of the decorator
# @my_decorator
# def say_hello():
#     print("Hello!")

# say_hello()


# import time
# def timer(function):
#     def wrapper(*args, **kwargs):
#         start = time.time()
#         result = function(*args, **kwargs)
#         end= time.time()
#         print(f" {function.__name__} ran in {end- start}")
#         return result
#     return wrapper

# @timer
# def example(n):
#     time.sleep(n)

# example(2)



def debug(fun):
    def wrap(*args, **kwargs):
        args_val = ', '.join(str(args) for arg in args)
        kwargs_val = ', '.join(f" {k}= {v}" for k, v in kwargs.items())
        print(f" calling {fun.__name__} with args {args_val} and kwargs {kwargs_val}")
        return fun(*args, **kwargs)
    return wrap



@debug
def greet(name, greeting):
    print(f"{greeting}, {name}")
    
greet("prahil", "hello ji")

 