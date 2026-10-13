({
    onLoad : function(component, event, helper) {
        var pageRef = component.get("v.pageReference");
        var id = pageRef && pageRef.state ? pageRef.state.c__id : '';
        component.set("v.id", id);
    }
})