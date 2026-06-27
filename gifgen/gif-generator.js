(function () {
    'use strict';

    var frames = [];
    var dragSourceIndex = null;
    var generating = false;
    var outputBlob = null;

    var $ = function (id) { return document.getElementById(id); };

    var dropZone = $('dropZone');
    var fileInput = $('fileInput');
    var frameList = $('frameList');
    var frameCountEl = $('frameCount');
    var generateBtn = $('generateBtn');
    var clearBtn = $('clearBtn');
    var progressBar = $('progressBar');
    var progressFill = $('progressFill');
    var progressText = $('progressText');
    var outputSection = $('outputSection');
    var outputPreview = $('outputPreview');
    var outputInfo = $('outputInfo');
    var downloadBtn = $('downloadBtn');
    var fpsDisplay = $('fpsDisplay');
    var outputWidthInput = $('outputWidth');
    var outputHeightInput = $('outputHeight');
    var keepAspectRatio = $('keepAspectRatio');
    var frameDelayInput = $('frameDelay');
    var resizeModeSelect = $('resizeMode');
    var qualityInput = $('quality');
    var repeatSelect = $('repeat');
    var bgColorInput = $('bgColor');

    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }

    function readImageAsDataURL(file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function () { resolve(reader.result); };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    function loadImage(src) {
        return new Promise(function (resolve, reject) {
            var img = new Image();
            img.onload = function () { resolve(img); };
            img.onerror = reject;
            img.src = src;
        });
    }

    function drawFrameToCanvas(img, width, height, mode, bgColor) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);

        var sw = img.naturalWidth || img.width;
        var sh = img.naturalHeight || img.height;
        var dw, dh, dx, dy;

        if (mode === 'stretch') {
            dw = width;
            dh = height;
            dx = 0;
            dy = 0;
        } else if (mode === 'fill') {
            var scaleFill = Math.max(width / sw, height / sh);
            dw = sw * scaleFill;
            dh = sh * scaleFill;
            dx = (width - dw) / 2;
            dy = (height - dh) / 2;
        } else {
            var scaleFit = Math.min(width / sw, height / sh);
            dw = sw * scaleFit;
            dh = sh * scaleFit;
            dx = (width - dw) / 2;
            dy = (height - dh) / 2;
        }

        ctx.drawImage(img, dx, dy, dw, dh);
        return canvas;
    }

    function updateUI() {
        frameCountEl.textContent = frames.length;
        generateBtn.disabled = frames.length < 2 || generating;
        clearBtn.disabled = frames.length === 0 || generating;
    }

    function renderFrameList() {
        frameList.innerHTML = '';

        frames.forEach(function (frame, index) {
            var item = document.createElement('div');
            item.className = 'frame-item';
            item.setAttribute('data-index', index);
            item.draggable = true;

            var order = document.createElement('span');
            order.className = 'frame-item-order';
            order.textContent = index + 1;

            var removeBtn = document.createElement('button');
            removeBtn.className = 'frame-item-remove';
            removeBtn.textContent = '×';
            removeBtn.addEventListener('click', function () {
                frames.splice(index, 1);
                renderFrameList();
                updateUI();
            });

            var imgEl = document.createElement('img');
            imgEl.className = 'frame-item-img';
            imgEl.src = frame.dataURL;

            var info = document.createElement('div');
            info.className = 'frame-item-info';

            var nameSpan = document.createElement('span');
            nameSpan.className = 'frame-item-name';
            nameSpan.textContent = frame.name;

            var delayDiv = document.createElement('div');
            delayDiv.className = 'frame-item-delay';

            var delayInput = document.createElement('input');
            delayInput.type = 'number';
            delayInput.value = frame.delay || 200;
            delayInput.min = 10;
            delayInput.max = 10000;
            delayInput.addEventListener('change', function () {
                frame.delay = parseInt(this.value) || 200;
            });

            var delayUnit = document.createElement('span');
            delayUnit.textContent = 'ms';

            delayDiv.appendChild(delayInput);
            delayDiv.appendChild(delayUnit);

            info.appendChild(nameSpan);
            info.appendChild(delayDiv);

            item.appendChild(order);
            item.appendChild(removeBtn);
            item.appendChild(imgEl);
            item.appendChild(info);

            item.addEventListener('dragstart', function (e) {
                dragSourceIndex = index;
                item.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
            });

            item.addEventListener('dragend', function () {
                item.classList.remove('dragging');
                dragSourceIndex = null;
            });

            item.addEventListener('dragover', function (e) {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
            });

            item.addEventListener('drop', function (e) {
                e.preventDefault();
                if (dragSourceIndex === null || dragSourceIndex === index) return;
                var moved = frames.splice(dragSourceIndex, 1)[0];
                frames.splice(index, 0, moved);
                renderFrameList();
                updateUI();
            });

            frameList.appendChild(item);
        });

        updateUI();
    }

    function addFiles(files) {
        var promises = [];
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (!file.type.match(/^image\/(png|jpeg|bmp|webp|gif)/)) {
                if (!/\.(png|jpe?g|bmp|webp|gif)$/i.test(file.name)) continue;
            }
            promises.push(
                readImageAsDataURL(file).then(function (dataURL) {
                    return { dataURL: dataURL, name: file.name, file: file, delay: 0 };
                })
            );
        }

        Promise.all(promises).then(function (results) {
            results.forEach(function (r) {
                r.delay = parseInt(frameDelayInput.value) || 200;
                frames.push(r);
            });
            renderFrameList();
        });
    }

    dropZone.addEventListener('click', function () { fileInput.click(); });

    fileInput.addEventListener('change', function () {
        if (this.files.length > 0) addFiles(this.files);
        this.value = '';
    });

    dropZone.addEventListener('dragover', function (e) {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', function () {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', function (e) {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files);
    });

    frameDelayInput.addEventListener('input', function () {
        var delay = parseInt(this.value) || 200;
        fpsDisplay.textContent = (1000 / delay).toFixed(1);
    });

    keepAspectRatio.addEventListener('change', function () {
        if (!this.checked) {
            outputHeightInput.disabled = false;
            return;
        }
        outputHeightInput.disabled = false;
    });

    clearBtn.addEventListener('click', function () {
        if (generating) return;
        frames = [];
        renderFrameList();
        outputSection.style.display = 'none';
        outputBlob = null;
    });

    generateBtn.addEventListener('click', function () {
        if (generating || frames.length < 2) return;
        generateGIF();
    });

    downloadBtn.addEventListener('click', function () {
        if (!outputBlob) return;
        var url = URL.createObjectURL(outputBlob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'output_' + Date.now() + '.gif';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    function generateGIF() {
        generating = true;
        generateBtn.disabled = true;
        clearBtn.disabled = true;
        progressBar.style.display = 'block';
        progressFill.style.width = '0%';
        progressText.textContent = '准备中...';

        var width = parseInt(outputWidthInput.value) || 800;
        var height = parseInt(outputHeightInput.value) || 600;
        var mode = resizeModeSelect.value;
        var quality = parseInt(qualityInput.value) || 10;
        var repeatCount = parseInt(repeatSelect.value) || 0;
        var bgColor = bgColorInput.value;

        var gif = new GIF({
            workers: 2,
            quality: quality,
            width: width,
            height: height,
            repeat: repeatCount,
            workerScript: 'https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js',
            transparent: null,
            bgColor: bgColor
        });

        var loadPromises = frames.map(function (frame) {
            return loadImage(frame.dataURL).then(function (img) {
                var canvas = drawFrameToCanvas(img, width, height, mode, bgColor);
                var delay = frame.delay || parseInt(frameDelayInput.value) || 200;
                gif.addFrame(canvas, { delay: delay, copy: true });
            });
        });

        Promise.all(loadPromises).then(function () {
            progressText.textContent = '编码中...';

            gif.on('progress', function (p) {
                var pct = Math.round(p * 100);
                progressFill.style.width = pct + '%';
                progressText.textContent = pct + '%';
            });

            gif.on('finished', function (blob) {
                outputBlob = blob;
                generating = false;
                progressBar.style.display = 'none';
                generateBtn.disabled = false;
                clearBtn.disabled = false;

                outputPreview.src = URL.createObjectURL(blob);
                outputInfo.textContent =
                    '尺寸: ' + width + ' × ' + height + ' | ' +
                    '帧数: ' + frames.length + ' | ' +
                    '文件大小: ' + formatFileSize(blob.size) + ' | ' +
                    '循环: ' + (repeatCount === 0 ? '无限' : (repeatCount === -1 ? '不循环' : repeatCount + '次'));
                outputSection.style.display = 'block';
            });

            gif.render();
        }).catch(function (err) {
            generating = false;
            progressBar.style.display = 'none';
            generateBtn.disabled = false;
            clearBtn.disabled = false;
            alert('GIF 生成失败: ' + err.message);
        });
    }
})();
