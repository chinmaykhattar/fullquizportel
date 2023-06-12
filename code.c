#include <stdio.h> 

#include <stdlib.h> 

#include <string.h> 

#include <dirent.h> 

#include <regex.h> 

#include <unistd.h> 

#include <limits.h> 

 

#define MAX_PATTERN_LENGTH 100 

 

Void search_files(const char *dir_path, const char *file_pattern, const char *regex_pattern) { 

    DIR *dir; 

    Struct dirent *entry; 

    Regex_t regex; 

 

    Char file_path[PATH_MAX]; 

    While ((entry = readdir(dir)) != NULL) { 

        If (strcmp(entry->d_name, “.”) == 0 || strcmp(entry->d_name, “..”) == 0) { 

            Continue; 

        } 

 

        Snprintf(file_path, sizeof(file_path), “%s/%s”, dir_path, entry->d_name); 

 

        If (entry->d_type == DT_DIR) { 

            Search_files(file_path, file_pattern, regex_pattern);

        } else if (entry->d_type == DT_REG) { 

            If (fnmatch(file_pattern, entry->d_name, 0) == 0) { 

                FILE *file = fopen(file_path, “r”); 

                If (file == NULL) { 

                    Fprintf(stderr, “Failed to open file: %s\n”, file_path); 

                    Continue; 

                } 

 

                Char line[PATH_MAX]; 

                While (fgets(line, sizeof(line), file) != NULL) { 

                    If (regexec(&regex, line, 0, NULL, 0) == 0) { 

                        Printf(“Match found in file: %s\n”, file_path); 

                        Break; 

                    } 

                } 

 

                Fclose(file); 

            } 

        } 

    } 

 

    Closedir(dir); 

    Regfree(&regex); 

} 

 

Int main(int argc, char *argv[]) { 

    If (argc < 3) { 

        Printf(“Usage: %s <file_pattern> <regex_pattern>\n”, argv[0]); 

        Return 1; 

    } 

 

    Const char *file_pattern = argv[1]; 

    Const char *regex_pattern = argv[2]; 

 

    Char current_dir[PATH_MAX]; 

    Search_files(current_dir, file_pattern, regex_pattern); 

 

    Return 0; 

}
