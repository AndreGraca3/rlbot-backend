module.exports = function (services) {

  async function enterTraining(req, rsp) {
    await services.enterTraining(req.body.map);
    rsp.json("Entered training registered.");
  }

  async function becomeIdle(req, rsp) {
    await services.becomeIdle();
    rsp.json("Entered idle state registered.");
  }

  return {
    enterTraining,
    becomeIdle,
  };
}
