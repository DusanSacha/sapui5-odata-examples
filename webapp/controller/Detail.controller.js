sap.ui.define([
	"_01oDataUpdate/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("_01oDataUpdate.controller.Detail", {
		onInit: function() {
			var oRouter = this.getRouter();
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function(oEvent) {
			var iId = oEvent.getParameter("arguments").id;
			var oModel = this.getModel("northwind");
			
			var that = this;
			var sPath = "/Categories("+iId+")";
			oModel.read(sPath,{
				success: function(oData,response) {
					
					that.getView().bindElement({
						path: sPath,
						model: "northwind"
					});
				},
				error: function(oError) {
					console.log(oError);
				}
			});
		},
		onSave: function(oEvent) {
			debugger; 
			var oData = this.getView().getBindingContext("northwind").getObject();
			console.log(oData);
			// here I would like to update my data via ODATA service:
			// this.getView().getModel().update(....)
			// but input from user is NOT in model
		}
	});
});