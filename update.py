import subprocess


def execute_command(command):
    process = subprocess.Popen(
        command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )
    stdout, stderr = process.communicate()
    return process.returncode, stdout.decode(), stderr.decode()


def git_commands(comment):
    print("Adding changes to the main branch")
    git_pull = "git pull origin main"
    git_add_cmd = "git add *"
    git_commit_cmd = 'git commit -m "{}"'.format(comment)
    git_push_cmd = "git push origin main"

    combined_cmd = "{} && {} && {} && {}".format(
        git_add_cmd, git_commit_cmd, git_pull, git_push_cmd
    )
    returncode, stdout, stderr = execute_command(combined_cmd)
    print(stdout)


def npm_build(comment):
    print("Adding changes to the gh-pages branch")
    git_pull = "git pull origin gh-pages"
    npm_cmd = "npm run build"
    git_add_cmd = "git add dist -f"
    git_commit_cmd = 'git commit -m "{}"'.format(comment)
    git_push_cmd = "git push origin gh-pages"

    combined_cmd = "{} && {} && {} && {} && {}".format(
        npm_cmd, git_add_cmd, git_commit_cmd, git_pull, git_push_cmd
    )
    returncode, stdout, stderr = execute_command(combined_cmd)
    print(stdout, returncode)


comment = input("Enter your Git comment:: ")

git_commands(comment)

npm_build(comment)
