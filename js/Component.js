/**
 * @file Defines the most basic functionality of all objects that may be created as a part of the canvas controls
 * 
 * @author Christopher Tubbs
 */

 const Component = {
     create: function(x, y, height, width, options) {
        let x = x || 0;
        let y = y || 0;
        let componentHeight = height || 0;
        let componentWidth = width || 0;

        let properties = {};
        let componentValue = null;

        let children = [];

        let onClick = [];
        let onDoubleClick = [];
        let onMouseHold = [];
        let onMouseMove = [];
        let onUnclick = [];
        let onScroll = [];
        let onMouseOver = [];
        let onMouseOut = [];

        let onDrag = [];
        let onDragStart = [];
        let onDragOver = [];
        let onDragEnd = [];
        let onDrop = [];

        let onKeyDown = [];
        let onKeyPress = [];
        let onKeyUp = [];
        let onInput = [];

        let onFocus = [];
        let onChange = [];
        let onCheck = [];

        let onChildAdd = [];
        let onChildRemove = [];

        let onRender = [];
        let onMessage = [];
        let onSubmit = [];

        return {
            set value(val) {
                let eventArguments = {
                    oldValue: componentValue,
                    newValue: val
                };

                componentValue = val;

                for (handler of onChange) {
                    handler(this, eventArguments);
                }
            },
            get value() {
                let eventArguments = {
                    oldValue: componentValue,
                    newValue: componentValue
                }

                for (handler of onCheck) {
                    handler(this, eventArguments);
                }
                
                return componentValue;
            },
            get height() {
                return componentHeight;
            },
            get width() {
                return componentWidth;
            },
            get anchor() {
                return (x, y);
            },
            get left() {
                return x;
            },
            get top() {
                return y;
            },
            get right() {
                return x + componentWidth;
            },
            get bottom() {
                return y + componentHeight;
            },
            click: function(MouseEvent) {
                for (var childIndex = children.length - 1; childIndex >= 0; childIndex--) {
                    children[childIndex].click(MouseEvent);
                }

                if (this.containsMouse(MouseEvent)) {
                    onClick.forEach(handler => handler(this, MouseEvent));
                }
            },
            unClick: function(MouseEvent) {
                for(var childIndex = children.length - 1; childIndex >= 0; childIndex--) {
                    children[childIndex].unclick(MouseEvent);
                }

                if (this.containsMouse(MouseEvent)) {
                    onUnclick.forEach(handler => handler(this, MouseEvent));
                }
            },
            focus: function() {
                for (var childIndex = children.length - 1; childIndex >= 0; childIndex--) {
                    children[childIndex].focus();
                }

                onFocus.forEach(handler => handler());
            },
            containsMouse: function(MouseEvent) {
                let mouseY = MouseEvent.clientY;
                let mouseX = MouseEvent.clientX;

                let withinX = mouseX >= this.left && mouseX <= this.right;
                let withinY = mouseY >= this.top && mouseY <= this.bottom;

                return withinX && withinY;
            },
            doubleClick: function(MouseEvent) {
                for (var childIndex = children.length - 1; childIndex >= 0; childIndex--) {
                    children[childIndex].doubleClick(MouseEvent);
                }

                if (this.containsMouse(MouseEvent)) {
                    onDoubleClick.forEach(handler => handler(this, MouseEvent));
                }
            },
            keyDown: function(KeyboardEvent) {
                for (var childIndex = children.length - 1; childIndex >= 0; childIndex--) {
                    children[childIndex].keyDown(KeyboardEvent);
                }

                onKeyDown.forEach(handler => handler(this, KeyboardEvent));
            },
            keyPress: function(KeyboardEvent) {
                for (var childIndex = children.length - 1; childIndex >= 0; childIndex--) {
                    children[childIndex].keyPress(KeyboardEvent);
                }

                onKeyPress.forEach(handler => handler(this, KeyboardEvent));
            },
            keyUp: function(KeyboardEvent) {
                for (var childIndex = children.length - 1; childIndex >= 0; childIndex--) {
                    children[childIndex].keyUp(KeyboardEvent);
                }

                onKeyUp.forEach(handler => handler(this, KeyboardEvent));
            },
            input: function(event) {
                for(var childIndex = children.length - 1; childIndex >= 0; childIndex--) {
                    children[childIndex].input(event);
                }

                onInput.forEach(handler => handler(this, event));
            },
            addChild: function(childComponent) {
                children.push(childComponent);

                onChildAdd.forEach(handler => handler(this, childComponent));
            },
            draw: function() {
                throw new Error('No draw method was implemented');
            }
        }
     }
 }