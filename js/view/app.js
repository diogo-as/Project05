var initialData = [
    { name: "torre de tv", lat: -15.80, lng: -47.93},
    { name: "shopping", lat: -15.801, lng: -47.93},
    { name: "parque da cidade", lat: -15.80, lng: -47.93},
    { name: "congresso", lat: -15.802, lng: -47.93},
    { name: "catedral", lat: -15.803, lng: -47.93}

];

var LocalView = function(items) {
    this.items = ko.observableArray(items);

};

ko.applyBindings(new LocalView(initialData));
