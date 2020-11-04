let render = function (template, node) {
        if (!node) {return;}

        if(array.length <= 0) {
            template += '';
            node.innerHTML = template;
        } else {
            for (let p = 0; p < array.length; p++) {
                template += ``;
                node.innerHTML = template;
            };
        }   
    }