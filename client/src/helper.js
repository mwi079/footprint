export function homeUnits(intensity, gasUnits, elecUnits, homeUse) {
  const gasCO2kw = 185; //g per kWh- varies with efficiency of boiler
  const kWhtoft3 = 0.317; // 31.7kW per 100 cubic ft
  const kWhtom3 = 11.2; // 11.2 kWh per cubic meter
  const kWhtoMJ = 3.6; // 3.6 MJ  per kWh
  let CO2;
  if (gasUnits === 'kWh' && elecUnits === 'kWh') {
    CO2 = (+homeUse.elec * +intensity + homeUse.gas * gasCO2kw) / 1000;
  } else if (gasUnits === 'kWh' && elecUnits === 'MJ') {
    CO2 =
      ((+homeUse.elec / kWhtoMJ) * +intensity + homeUse.gas * gasCO2kw) / 1000;
  } else if (gasUnits === 'm3' && elecUnits === 'kWh') {
    CO2 =
      (+homeUse.elec * +intensity + homeUse.gas * kWhtom3 * gasCO2kw) / 1000;
  } else if (gasUnits === 'm3' && elecUnits === 'MJ') {
    CO2 =
      ((+homeUse.elec / kWhtoMJ) * +intensity +
        homeUse.gas * kWhtom3 * gasCO2kw) /
      1000;
  } else if (gasUnits === 'ft3' && elecUnits === 'kWh') {
    CO2 =
      (+homeUse.elec * +intensity + homeUse.gas * kWhtoft3 * gasCO2kw) / 1000;
  } else if (gasUnits === 'ft3' && elecUnits === 'MJ') {
    CO2 =
      ((+homeUse.elec / kWhtoMJ) * +intensity +
        homeUse.gas * kWhtoft3 * gasCO2kw) /
      1000;
  }
  return CO2;
}

export function carUnits(data, journey, distanceUnits, carCompare) {
  const milestokm = 1.60934;
  let CO2;

  if (+data.co2TailpipeGpm !== 0) {
    if (distanceUnits === 'km') {
      CO2 = (+journey.distance * +data.co2TailpipeGpm) / milestokm / 1000;
    } else {
      CO2 = (+journey.distance * +data.co2TailpipeGpm) / 1000;
    }
  } else {
    //

    if (distanceUnits === 'km') {
      CO2 =
        (+journey.distance *
          (+data.cityE / 100 / milestokm) *
          +carCompare.intensity) /
        milestokm /
        1000;
    } else {
      CO2 =
        (+journey.distance * (+data.cityE / 100) * +carCompare.intensity) /
        1000;
    }
  }
  return CO2;
}

export function compareCO2(carCompare, journey, distanceUnits) {
  let carCompareCO2;
  const milestokm = 1.60934;

  if (distanceUnits === 'km') {
    carCompareCO2 = (carCompare.compare * journey.distance) / milestokm;
  } else {
    carCompareCO2 = carCompare.compare * journey.distance;
  }

  return carCompareCO2;
}
