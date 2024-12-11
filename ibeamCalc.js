function ibeam(sigma, forceApplied, beamThick, distances) {
    const tol = 2.0; // tolerance for the system (how close we want our desired shear modulus to be to the limit)
    const heightVals = Array.from({ length: 1001 - 2 * beamThick }, (_, i) => i + 1); // Height of I-beam (mm)
    const widthVals = Array.from({ length: 1001 - 2 * beamThick }, (_, i) => i + 1); // width of I-beam (mm)
  
    const returnDataList = distances.map((distance) => {
      const widthData = [];
  
      heightVals.forEach((height) => {
        const rowData = [];
  
        widthVals.forEach((width) => {
          // calculating moment (Nmm)
          const momentNm = forceApplied * distance;
  
          // calculating shear modulus based on given conditions
          const zShear = momentNm / sigma;
  
          // calculating XSA for each height/w combination
          const xsa = 2 * beamThick * width + beamThick * height;
  
          // calculating ix (i.e. inertia of rotation about the x-axis) for each h/w combination
          const ix = (beamThick * height ** 3) / 12 + (width / 12) * ((2 * beamThick + height) ** 3 - height ** 3);
  
          // calculating neutral axis for each h combination
          const y = height / 2 + beamThick;
  
          // calculating zInt for each Ix/y combination
          let zInt = ix / y;
  
          // check to see if zInt <= zShear or >= tol * zShear since this is not ideal
          // if (zInt <= zShear || zInt >= tol * zShear) {
          if (zInt <= zShear) {
            zInt = 0;
          }
  
          // Creating the relationship between zInt and XSA
          const geom = Math.round(zInt / xsa, 2);
  
          rowData.push([height, width, distance, geom]);
        });
  
        widthData.push(...rowData);
      });
  
      // max geom value determines optimal height and width
      const maxRow = widthData.reduce((prev, curr) => (curr[3] > prev[3] ? curr : prev), widthData[0]);
  
      return {
        height: maxRow[0],
        width: maxRow[1],
        distance: maxRow[2],
      };
    });
  
    return returnDataList;
  }

module.exports = ibeam; // Export the function to make it accessible to other files
