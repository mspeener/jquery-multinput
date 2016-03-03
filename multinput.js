(function ($) {
    var MultiInput = function (element) {
        var elem = $(element);
        var obj = this;
        var parent = elem.parent();
        var multelem;
        this.clear = function () {
            var items = parent.find('.multinput-choice');
            $.each(items, function (index, value) {
                $(this).remove();
            });
            elem.val('');
        };
        this.reinit = function (values) {
            this.clear();
            if (values) {
                var aValues = values.split(",");
                $.each(aValues, function (index, value) {
                    var new_li = $('<li class="multinput-choice"><div class="multinput-value">' + value.trim() + '</div><a data-value="' + value.trim() + '" class="multinput-choice-close" href="#" tabindex="-1"></a></li>');
                    var remove = new_li.find('a');
                    remove.click(function (e) {
                        e.stopPropagation();
                        var remVal = $(this).data("value");
                        $(this).parent().remove();
                        elem.val(obj.getCSV());
                        elem.trigger("change");
                    });
                    parent.find('input').parents(".multinput-box").before(new_li);
                });
            }
            parent.find('input').val('');
        };
        this.init = function () {
            var input = elem[0].outerHTML;
            var re = new RegExp($(element).prop("id"), "g");
            input = input.replace(re, "multinput_" + $(element).prop("id"));
            var html = "<ul class='multinput-list'><li class='multinput-box'><div>" + input;
            html += "</div></li></ul>";
            parent.prepend(html);
            elem.hide();
            multelem = $("#multinput_" + $(element).prop("id"));
            var values = elem.val();
            if (values.length > 0) {
                var aValues = values.split(",");
                $.each(aValues, function (index, value) {
                    var new_li = $('<li class="multinput-choice"><div class="multinput-value">' + value.trim() + '</div><a data-value="' + value.trim() + '" class="multinput-choice-close" href="#" tabindex="-1"></a></li>');
                    var remove = new_li.find('a');
                    remove.click(function (e) {
                        e.stopPropagation();
                        var remVal = $(this).data("value");
                        $(this).parent().remove();
                        elem.val(obj.getCSV());
                        elem.trigger("change");
                    });
                    parent.find('input').parents(".multinput-box").before(new_li);
                });
            }
            parent.find("#multinput_" + $(element).prop("id")).val('');
            parent.find('input').data('multinput', obj);
            parent.find('input').keypress(function (e) {
                if (e.keyCode === 13) {
                    var txtbox = $(this);
                    if (txtbox.val() === "") { // You can include the validations here
                        return false;
                    }
                    var new_li = $('<li class="multinput-choice"><div class="multinput-value">' + txtbox.val() + '</div><a class="multinput-choice-close" href="#" tabindex="-1"></a></li>');
                    var remove = new_li.find('a');
                    remove.click(function (e) {
                        e.stopPropagation();
                        $(this).parent().remove();
                        elem.val(obj.getCSV());
                        elem.trigger("change");
                    });
                    $(this).parents(".multinput-box").before(new_li);
                    var eVal = elem.val();
                    if(eVal.length > 0) {
                        elem.val(elem.val() + "," + txtbox.val());
                    } else {
                        elem.val(txtbox.val());
                    }
                    elem.trigger("change");
                    txtbox.val('');
                    return false;
                }
            });
            return obj;
        };
        this.getCSV = function () {
            var values = parent.find(".multinput-value");
            var str = "";
            $.each(values, function (index, value) {
                str += $(value).html() + ",";
            });
            str = str.substring(0, str.length - 1);
            return str;
        };
        this.getArray = function () {
            var values = parent.find(".multinput-value");
            var arr = [];
            $.each(values, function (index, value) {
                arr.push($(value).html());
            });
            return arr;
        };
    };

    $.fn.extend({
        multinput: function () {
            return this.each(function () {
                // Do something to each element here.
                //var parent = $(this).parent();
                //if (parent.data('multinput') || $(this).data('multinput')) {
                //    return;
                //}
                var multinput = new MultiInput(this);
                multinput.init();
                //parent.data('multinput', multinput);
                //$(this).data('multinput', multinput);
            });
        }
    });
}(jQuery));