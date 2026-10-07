({
    /* update messageValue when user types */
    inputHandler : function (cmp, evt) {
        cmp.set("v.messageValue", evt.getSource().get("v.value"));
    },

    /* publish to LMS */
    publishMessage : function (cmp) {
        const text = cmp.get("v.messageValue");
        if (!text) { return; }

        const payload = { lmsData : { value : text } };
        cmp.find("smc").publish(payload);   // call publish on channel ref
    },

    /* receive from LMS */
    handleMessage : function (cmp, message) {
        if (message?.getParam("lmsData")) {
            const incoming = message.getParam("lmsData").value;
            cmp.set("v.messageReceived", incoming);
        }
    }
})