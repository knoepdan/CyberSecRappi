# Python

### Python basics

`python3 --version` -> shows the current version
`python scriptName.py ` -> runs a python script
`python -m pip install bs4 requests` -> pip is the program to install/upgrade and remove packages. (see package manager)

### Virtual environment (venv)
A self-contained directory tree that contains a Python installation for a particular version of Python, plus a number of additional packages.

- `sudo apt-get install python3.10-venv` -> install venv on your system
- `python3 -m venv nameOfVirtEnv` -> creates a "virtual environment" and the corresponding dir
  - created dir contains copy of python interpreter etc.
- `. ./nameOfVirtEnv/bin/activate` -> activate virt. environment
  - on windows one would have to run a 'activate.bat' file
- `deactivate` will deactivate the virtual environment (in any folder)
  - or just close the terminal


### Package manager Pip
A package manager, not unlike npm or yarn (from nodeJs). By default packages are installed globaly. To avoid cluttering the global "space" with packages, use virtual environments (see separate chapter)
Example command. 
`python -m pip install bs4 requests` ->will install the libs bs4 and requests. (basically updates files Pipfile and Pipfile.lock and downloads the libs)

2 files are used to manage the libs: 
- PipFile
  - contains the libs/packages we requested 
  - similar to the package.json file in node
- Pipfile.lock
  - contains all the libs/packages including dependencies and subdependencies (etc.).
  - contains the exact version (as the version requested might be fuzzy) and hashes to ensure the integrity of the packages
    - could be useful for automated build processes, repeateable builds etc.
    - could be useful for automated build processes, repeateable builds etc.




###Links
- https://docs.python.org/3/tutorial/venv.html
- https://www.infoworld.com/article/3239675/virtualenv-and-venv-python-virtual-environments-explained.html
- https://packaging.python.org/en/latest/tutorials/installing-packages/#optionally-create-a-virtual-environment


### Debugging in VS Code
Simple with debugging extension. 

Debugging with params: 
1. Create launch.json file (VS Code helps with it)
2. Add "args":  `"args": ["-d", "compass-security.com"]`   (array with key, value, key2, value2)
https://stackoverflow.com/questions/51244223/visual-studio-code-how-debug-python-script-with-arguments 

### Varia
**Virtual environment in python 2**
Python 2 doesn't support virtual environments out of the box. One has to install third-party libraries (e.g. virtualenv) to create and manage such environments. 

Python supports: 
- json
- pickle -> like json but will also serialize functions (can be used for an exploit as during deserialization some code is executed)