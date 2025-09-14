(() => {
    "use strict";
    
    const action = new PlugIn.Action(function(selection) {
        // Get the selected folders
        const selectedFolders = selection.folders;
        
        // Validate that exactly one folder is selected
        if (selectedFolders.length !== 1) {
            new Alert(
                "Selection Error", 
                "Please select exactly one folder to sort its contents alphabetically."
            ).show();
            return;
        }
        
        const parentFolder = selectedFolders[0];
        let totalSorted = 0;
        let foldersProcessed = 0;
        
        try {
            // Function to sort sections (folders and projects) within a folder
            function sortSectionsInFolder(folder, isRoot = false) {
                const sections = folder.sections; // Gets both folders and projects
                
                if (sections.length <= 1) {
                    return 0; // Nothing to sort
                }
                
                // Create array with names for sorting
                const sectionPairs = sections.map(section => ({
                    section: section,
                    name: section.name.toLowerCase(),
                    isFolder: section.constructor.name === 'Folder'
                }));
                
                // Sort alphabetically by name, with folders first, then projects
                sectionPairs.sort((a, b) => {
                    // If one is a folder and one is a project, folder comes first
                    if (a.isFolder && !b.isFolder) return -1;
                    if (!a.isFolder && b.isFolder) return 1;
                    
                    // Both are the same type, sort alphabetically
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                });
                
                // Check if reordering is needed
                let needsReordering = false;
                for (let i = 0; i < sections.length; i++) {
                    if (sections[i] !== sectionPairs[i].section) {
                        needsReordering = true;
                        break;
                    }
                }
                
                let sortedCount = 0;
                if (needsReordering) {
                    // Move sections to achieve sorted order
                    const sortedSections = sectionPairs.map(pair => pair.section);
                    
                    for (let i = 0; i < sortedSections.length; i++) {
                        moveSections([sortedSections[i]], folder.ending);
                    }
                    
                    sortedCount = sections.length;
                    if (isRoot) {
                        console.log(`Sorted ${sortedCount} items in root folder "${folder.name}"`);
                    }
                }
                
                return sortedCount;
            }
            
            // Function to recursively process a folder and its subfolders
            function processFolderRecursively(folder, isRoot = false) {
                let localSorted = 0;
                let localProcessed = 0;
                
                // Sort contents of current folder
                localSorted += sortSectionsInFolder(folder, isRoot);
                localProcessed++;
                
                // Recursively process subfolders
                const subfolders = folder.folders;
                for (const subfolder of subfolders) {
                    const result = processFolderRecursively(subfolder, false);
                    localSorted += result.sorted;
                    localProcessed += result.processed;
                }
                
                return {
                    sorted: localSorted,
                    processed: localProcessed
                };
            }
            
            // Start processing from the selected parent folder
            const result = processFolderRecursively(parentFolder, true);
            totalSorted = result.sorted;
            foldersProcessed = result.processed;
            
            // Provide feedback based on results
            if (totalSorted === 0) {
                new Alert(
                    "Already Sorted", 
                    `All folders and projects in "${parentFolder.name}" and its subfolders are already in alphabetical order.`
                ).show();
            } else {
                const message = `Successfully sorted contents in ${foldersProcessed} folder(s):\n\n` +
                              `• Total items reordered: ${totalSorted}\n` +
                              `• Folders processed: ${foldersProcessed}\n\n` +
                              `Folders are placed before projects, then sorted alphabetically within each group.`;
                
                new Alert("Sort Complete", message).show();
            }
            
        } catch (error) {
            new Alert(
                "Error", 
                `Failed to sort folder contents: ${error.message}`
            ).show();
            console.error("Sort enhanced error:", error);
        }
    });
    
    // Set action properties
    action.validate = function(selection) {
        // Enable the action only when exactly one folder is selected
        return selection.folders.length === 1;
    };
    
    return action;
})();