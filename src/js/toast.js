class Toast {
    show(content,timeout = 5 ,type = 'info') {
        let template = this.parseHTML(this.getTemplate(content, type))[0];
        timeout = timeout*1000;
        template.querySelector('.close').addEventListener('click',(e)=>{
            this.close(template);
        });
        let container = document.querySelector('.toast__container');

        container.appendChild(template);
        setTimeout(()=>{
            this.close(template);
        },timeout);
    }
    parseHTML(str) {
        let tmp = document.implementation.createHTMLDocument();
        tmp.body.innerHTML = str;
        return tmp.body.children;
    }
    success(content,timeout = 5){
        this.show(content,timeout,'success');
    }
    danger(content,timeout = 5){
        this.show(content,timeout,'danger');
    }
    info(content,timeout = 5){
        this.show(content,timeout,'info');
    }
    warning(content,timeout = 5){
        this.show(content,timeout,'warning');
    }
    close(template){
        template.classList.add('hide');
        setTimeout(()=>{
            template.remove();
        },300);
    }

    getTemplate(content, type) {
        return `<div class="toast__message ${type}"><div class="text">${content}</div><i class="close"></i></div>`
    }
}

const toast = new Toast();

