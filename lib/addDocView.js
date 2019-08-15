/**
* create a new View and emit an event
* @param {org.log.view.AddDocView} docView AddDocView transaction to process
* @transaction
*/
async function addDocView(docView) 
{
	// get date field for new View object
	var date = new Date().toString();

	// create id for new View object
	// concatenate variables for a unique id
	var viewid = docView.userid + docView.dochash + date;

	// create new View object and set values
	var view = getFactory().newResource('org.log.view', 'View', viewid);
	view.userid = docView.userid;
	view.dochash = docView.dochash;
	view.date = date;

	// add new View to asset registry
	let assetRegistry = await getAssetRegistry('org.log.view.View');
	await assetRegistry.add(view);

	// emit event
	var event = getFactory().newEvent('org.log.view', 'DocViewEvent');
	event.userid = view.userid;
	event.dochash = view.dochash;
	event.date = view.date;
	emit(event);
}