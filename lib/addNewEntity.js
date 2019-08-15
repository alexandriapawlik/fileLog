/**
* create a new Entity and emit an event
* @param {org.log.entity.AddNewEntity} newEntity AddNewEntity transaction to process
* @transaction
*/
async function addNewEntity(newEntity) 
{
	// get date field for new Entity object
	var date = new Date().toString();

	// create id for new Entity object
	// concatenate variables for a unique id
	var entityid = newEntity.userid + newEntity.tin + date;

	// create new Entity object and set values
	var entity = getFactory().newResource('org.log.entity', 'Entity', entityid);
	entity.userid = newEntity.userid;
	entity.tin = newEntity.tin;
	entity.date = date;

	// add new Entity to asset registry
	let assetRegistry = await getAssetRegistry('org.log.entity.Entity');
	await assetRegistry.add(entity);

	// emit event
	var event = getFactory().newEvent('org.log.entity', 'NewEntityEvent');
	event.userid = entity.userid;
	event.tin = entity.tin;
	event.date = entity.date;
	emit(event);
}