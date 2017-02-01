sap.ui.define([
	"_01oDataUpdate/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController,JSONModel) {
	"use strict";

	return BaseController.extend("_01oDataUpdate.controller.Main", {
		onInit: function() {
			var oModel = new JSONModel();
			this.getView().setModel(oModel,"main");
		},
		onPress: function(oEvent){
			var iId = (this.getView().getModel("main").getData().productNr);
			this.getRouter().navTo("detail",{id: iId});
		}
	});
});