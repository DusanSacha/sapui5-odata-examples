sap.ui.define([
	"_01oDataUpdate/controller/BaseController",
	"sap/m/MessageToast",
	'sap/m/MessageBox'
], function(BaseController, MessageToast, MessageBox) {
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
			var that = this;
			MessageBox.confirm("Save item and go back to main page?", {
				title: "Confirm",
				onClose: function(oAction) {
					if (oAction == "OK") {
						that._updateOData();
					} else {
						console.log(oAction);
					}
				}
			});
			

		},
		_updateOData: function() {
			var oBindingContext = this.getView().getBindingContext("northwind");
			var sPath = oBindingContext.getPath();
			var oReqData = oBindingContext.getObject();
			
			var that = this;
			
			this.getModel("northwind").update(sPath, oReqData, {
				success: function (oData, response) {
					that.getRouter().navTo("appHome");     
					MessageToast.show("Item updated successfully");
				},
				error: function (oError) {
					MessageToast.show("Error during update, please check console log");
					console.log(oError);
				}
			});			
		}
	});
});