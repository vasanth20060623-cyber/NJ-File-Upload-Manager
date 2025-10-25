document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    const emptyState = document.getElementById('emptyState');
    const uploadBtn = document.getElementById('uploadBtn');

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop zone when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    // Handle dropped files
    dropZone.addEventListener('drop', handleDrop, false);
    
    // Handle selected files
    fileInput.addEventListener('change', handleFiles);

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight() {
        dropZone.classList.add('drag-over');
    }

    function unhighlight() {
        dropZone.classList.remove('drag-over');
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles({ target: { files } });
    }

    function handleFiles(e) {
        const files = e.target.files;
        if (files.length === 0) return;

        // Hide empty state if files are added
        if (emptyState) emptyState.style.display = 'none';

        // Process each file
        Array.from(files).forEach(file => {
            addFileToQueue(file);
        });
    }

    function addFileToQueue(file) {
        const fileId = Date.now() + Math.random().toString(36).substr(2, 9);
        const fileSize = formatFileSize(file.size);
        
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item bg-gray-50 rounded-lg p-4 flex justify-between items-center';
        fileItem.id = `file-${fileId}`;
        
        fileItem.innerHTML = `
            <div class="flex items-center space-x-4">
                <div class="p-2 bg-blue-100 rounded-lg">
                    <i data-feather="file" class="w-5 h-5 text-blue-600"></i>
                </div>
                <div>
                    <p class="font-medium text-gray-800 truncate max-w-xs">${file.name}</p>
                    <p class="text-sm text-gray-500">${fileSize}</p>
                </div>
            </div>
            <div class="flex items-center space-x-4">
                <div class="w-32 hidden">
                    <div class="progress-container">
                        <div class="progress-bar" style="width: 0%"></div>
                    </div>
                </div>
                <button class="file-remove text-red-500 hover:text-red-700">
                    <i data-feather="trash-2" class="w-5 h-5"></i>
                </button>
            </div>
        `;
        
        fileList.appendChild(fileItem);
        feather.replace();
        
        // Add remove event listener
        fileItem.querySelector('.file-remove').addEventListener('click', () => {
            fileItem.remove();
            if (fileList.children.length === 0 && emptyState) {
                emptyState.style.display = 'block';
            }
        });
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Upload functionality
    uploadBtn.addEventListener('click', function() {
        const fileItems = document.querySelectorAll('.file-item');
        if (fileItems.length === 0) {
            alert('No files to upload!');
            return;
        }

        fileItems.forEach(item => {
            const progressContainer = item.querySelector('.w-32');
            const progressBar = item.querySelector('.progress-bar');
            
            progressContainer.classList.remove('hidden');
            
            // Simulate upload progress (in a real app, this would be actual upload progress)
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    // Change to success state after upload completes
                    setTimeout(() => {
                        progressBar.classList.remove('bg-blue-600');
                        progressBar.classList.add('bg-green-500');
                        item.querySelector('.file-remove').classList.add('hidden');
                    }, 500);
                }
                progressBar.style.width = `${progress}%`;
            }, 200);
        });
    });
});