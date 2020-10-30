let render = function (template, node, array) {
	 // template = template;
	 // node = node;
	 // array  = array;
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