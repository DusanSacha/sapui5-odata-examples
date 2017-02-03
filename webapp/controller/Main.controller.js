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
		_prepareSearchHelpModel:function () {
			sap.ui.core.BusyIndicator.show();
			var oView = this.getView();
			var that = this;
			oView.getModel("northwind").read("/Categories",{
				success: function(oData, response) {
					var oSHModel = new JSONModel();
					oSHModel.setData(oData.results);
					oView.setModel(oSHModel,"searchHelp");
					that.displayHelpDialog();
					sap.ui.core.BusyIndicator.hide();
				},
				error: function(oError) {
					console.log(oError);
					sap.ui.core.BusyIndicator.hide();
				}
			});
		},
		
		onPress: function(oEvent){
			var iId = (this.getView().getModel("main").getData().productNr);
			this.getRouter().navTo("detail",{id: iId});
		},
		
		handleValueHelp: function(oEvent) {
			this._prepareSearchHelpModel();
		},
		
		displayHelpDialog: function() {
	        var aItems = this.getModel("searchHelp").getData();
			var aKeys= ["ID", "Name"];
			var that = this;
			
			var oValueHelp = new sap.ui.comp.valuehelpdialog.ValueHelpDialog({
				supportMultiselect: false,
				title: "Category",
				key: aKeys[0],				
				descriptionKey: aKeys[1],
				stretch: sap.ui.Device.system.phone, 
	 
				ok: function(oControlEvent) {
					//that.aTokens = oControlEvent.getParameter("tokens");
					//that.theTokenInput.setTokens(that.aTokens);
					var oData = that.getView().getModel("main").getData(); //productNr
					oData.productNr = oControlEvent.getParameter("tokens")[0].getKey();
					that.getView().getModel("main").setData(oData);
					oValueHelp.close();
				},
	 
				cancel: function(oControlEvent) {
					oValueHelp.close();
				},
	 
				afterClose: function() {
					oValueHelp.destroy();
				}
			});
			
			var oColModel = new sap.ui.model.json.JSONModel();
			oColModel.setData({
				cols: [
				      	{label: "Category ID", template: "ID"},
				        {label: "Category Name", template: "Name"}
				]
			});
			oValueHelp.getTable().setModel(oColModel, "columns");
			
			var oRowsModel = new sap.ui.model.json.JSONModel();
			oRowsModel.setData(aItems);
			oValueHelp.getTable().setModel(oRowsModel);
			if (oValueHelp.getTable().bindRows) {
				oValueHelp.getTable().bindRows("/"); 
			}
		
			oValueHelp.open();
		}
	});
});