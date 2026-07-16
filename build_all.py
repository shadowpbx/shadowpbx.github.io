#!/usr/bin/env python3
import os
import subprocess
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

subfolders = [
    "Cybersecurity",
    "Blog",
    "Tutorials",
    "Cybersecurity_Study",
    "Cybersecurity_Tools",
    "Cybersecurity_Tutorials"
]

root_dir = os.path.dirname(os.path.abspath(__file__))

def build_all():
    logging.info("Starting Global Website Build...")
    
    for folder in subfolders:
        folder_path = os.path.join(root_dir, folder)
        generator_script = os.path.join(folder_path, "generate_index.py")
        
        if os.path.exists(generator_script):
            logging.info(f"Compiling section: {folder}...")
            try:
                subprocess.run(
                    ["python3", "generate_index.py"],
                    cwd=folder_path,
                    check=True
                )
                logging.info(f"Successfully compiled {folder}.")
            except subprocess.CalledProcessError as e:
                logging.error(f"Error compiling {folder}: {e}")
        else:
            logging.warning(f"No compiler script found in {folder} (expected: generate_index.py)")
            
    # Build CLEP READMEs
    clep_compiler = os.path.join(root_dir, "CLEP", "compile_readmes.py")
    if os.path.exists(clep_compiler):
        logging.info("Compiling CLEP README files...")
        try:
            subprocess.run(
                ["python3", "compile_readmes.py"],
                cwd=os.path.join(root_dir, "CLEP"),
                check=True
            )
            logging.info("Successfully compiled CLEP READMEs.")
        except subprocess.CalledProcessError as e:
            logging.error(f"Error compiling CLEP READMEs: {e}")

    logging.info("Global Website Build Complete!")

if __name__ == "__main__":
    build_all()
