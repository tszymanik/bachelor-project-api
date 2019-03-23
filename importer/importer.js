require('dotenv').config();
const csv = require('csvtojson');
const mongoose = require('mongoose');

const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const FieldOfStudy = require('../models/FieldOfStudyModel').Model;
const Specialization = require('../models/SpecializationModel').Model;
const Subject = require('../models/SubjectModel').Model;

const generateFieldsOfStudy = subjectsData => (
  Promise.all(subjectsData.map(async subjectData => (
    FieldOfStudy.findOneAndUpdate(
      {
        name: subjectData.kierunek_nazwa,
        shortName: subjectData.kierunek_skrot,
        faculty: {
          name: subjectData.wydzial_nazwa,
          shortName: subjectData.wydzial_skrot,
        },
        typeOfStudies: {
          name: subjectData.rodzaj_studiow_nazwa,
          shortName: subjectData.rodzaj_studiow_skrot,
        },
        academicYearName: subjectData.rok_akademicki_nazwa,
        typeOfRecruitment: {
          name: subjectData.rodzaj_naboru_nazwa,
          shortName: subjectData.rodzaj_naboru_skrot,
        },
        educationProfile: {
          name: subjectData.profil_ksztalcenia_nazwa,
          symbol: subjectData.profil_ksztalcenia_symbol,
        },
        levelOfEducation: {
          name: subjectData.poziom_ksztalcenia_nazwa,
          symbol: subjectData.poziom_ksztalcenia_symbol,
        },
        formOfStudies: {
          name: subjectData.forma_studiow_nazwa,
          symbol: subjectData.forma_studiow_symbol,
        },
      },
      {
        name: subjectData.kierunek_nazwa,
        shortName: subjectData.kierunek_skrot,
        faculty: {
          name: subjectData.wydzial_nazwa,
          shortName: subjectData.wydzial_skrot,
        },
        typeOfStudies: {
          name: subjectData.rodzaj_studiow_nazwa,
          shortName: subjectData.rodzaj_studiow_skrot,
        },
        academicYearName: subjectData.rok_akademicki_nazwa,
        typeOfRecruitment: {
          name: subjectData.rodzaj_naboru_nazwa,
          shortName: subjectData.rodzaj_naboru_skrot,
        },
        educationProfile: {
          name: subjectData.profil_ksztalcenia_nazwa,
          symbol: subjectData.profil_ksztalcenia_symbol,
        },
        levelOfEducation: {
          name: subjectData.poziom_ksztalcenia_nazwa,
          symbol: subjectData.poziom_ksztalcenia_symbol,
        },
        formOfStudies: {
          name: subjectData.forma_studiow_nazwa,
          symbol: subjectData.forma_studiow_symbol,
        },
      },
      {
        upsert: true,
      },
    )
      .exec()
  )))
);

const generateSubjects = subjectsData => (
  Promise.all(subjectsData.map(async subjectData => (
    Subject({
      name: subjectData.przedmiot_nazwa,
      fieldOfStudyId: await FieldOfStudy.findOne({
        name: subjectData.kierunek_nazwa,
        shortName: subjectData.kierunek_skrot,
        faculty: {
          name: subjectData.wydzial_nazwa,
          shortName: subjectData.wydzial_skrot,
        },
        typeOfStudies: {
          name: subjectData.rodzaj_studiow_nazwa,
          shortName: subjectData.rodzaj_studiow_skrot,
        },
        academicYearName: subjectData.rok_akademicki_nazwa,
        typeOfRecruitment: {
          name: subjectData.rodzaj_naboru_nazwa,
          shortName: subjectData.rodzaj_naboru_skrot,
        },
        educationProfile: {
          name: subjectData.profil_ksztalcenia_nazwa,
          symbol: subjectData.profil_ksztalcenia_symbol,
        },
        levelOfEducation: {
          name: subjectData.poziom_ksztalcenia_nazwa,
          symbol: subjectData.poziom_ksztalcenia_symbol,
        },
        formOfStudies: {
          name: subjectData.forma_studiow_nazwa,
          symbol: subjectData.forma_studiow_symbol,
        },
      })
        .exec(),
      semesterNumber: subjectData.numer_semestru,
      typeOfChoice: {
        name: subjectData.rodzaj_wyboru_nazwa,
        shortName: subjectData.rodzaj_wyboru_skrot,
      },
      specializationId: await Specialization.findOne({
        name: subjectData.specjalnosc_nazwa,
      })
        .exec(),
      departament: {
        name: subjectData.katedra_nazwa,
        shortName: subjectData.katedra_skrot,
      },
      ectsPoints: parseInt(subjectData.punkty_ects),
      typeOfTerm: {
        name: subjectData.sposob_zaliczenia_nazwa,
        shortName: subjectData.sposob_zaliczenia_skrot,
      },
      lecture: {
        hours: {
          fullTime: subjectData.godziny_wykladu,
          partTime: subjectData.godziny_wykladu_nst,
        },
      },
      exercise: {
        hours: {
          fullTime: subjectData.godziny_cwiczen,
          partTime: subjectData.godziny_cwiczen_nst,
        },
      },
      lab: {
        hours: {
          fullTime: subjectData.godziny_laboratorium,
          partTime: subjectData.godziny_laboratorium_nst,
        },
      },
    })
      .save()
  )))
);

const generateSpecializations = subjectsData => (
  Promise.all(subjectsData.map(async (subjectData) => {
    if (subjectData.specjalnosc_nazwa !== '-') {
      return Specialization.findOneAndUpdate(
        {
          name: subjectData.specjalnosc_nazwa,
          shortName: subjectData.specjalnosc_skrot,
          fieldOfStudyId: await FieldOfStudy.findOne({
            name: subjectData.kierunek_nazwa,
            shortName: subjectData.kierunek_skrot,
            faculty: {
              name: subjectData.wydzial_nazwa,
              shortName: subjectData.wydzial_skrot,
            },
            typeOfStudies: {
              name: subjectData.rodzaj_studiow_nazwa,
              shortName: subjectData.rodzaj_studiow_skrot,
            },
            academicYearName: subjectData.rok_akademicki_nazwa,
            typeOfRecruitment: {
              name: subjectData.rodzaj_naboru_nazwa,
              shortName: subjectData.rodzaj_naboru_skrot,
            },
            educationProfile: {
              name: subjectData.profil_ksztalcenia_nazwa,
              symbol: subjectData.profil_ksztalcenia_symbol,
            },
            levelOfEducation: {
              name: subjectData.poziom_ksztalcenia_nazwa,
              symbol: subjectData.poziom_ksztalcenia_symbol,
            },
            formOfStudies: {
              name: subjectData.forma_studiow_nazwa,
              symbol: subjectData.forma_studiow_symbol,
            },
          })
            .exec(),
        },
        {
          name: subjectData.specjalnosc_nazwa,
          shortName: subjectData.specjalnosc_skrot,
          fieldOfStudyId: await FieldOfStudy.findOne({
            name: subjectData.kierunek_nazwa,
            shortName: subjectData.kierunek_skrot,
            faculty: {
              name: subjectData.wydzial_nazwa,
              shortName: subjectData.wydzial_skrot,
            },
            typeOfStudies: {
              name: subjectData.rodzaj_studiow_nazwa,
              shortName: subjectData.rodzaj_studiow_skrot,
            },
            academicYearName: subjectData.rok_akademicki_nazwa,
            typeOfRecruitment: {
              name: subjectData.rodzaj_naboru_nazwa,
              shortName: subjectData.rodzaj_naboru_skrot,
            },
            educationProfile: {
              name: subjectData.profil_ksztalcenia_nazwa,
              symbol: subjectData.profil_ksztalcenia_symbol,
            },
            levelOfEducation: {
              name: subjectData.poziom_ksztalcenia_nazwa,
              symbol: subjectData.poziom_ksztalcenia_symbol,
            },
            formOfStudies: {
              name: subjectData.forma_studiow_nazwa,
              symbol: subjectData.forma_studiow_symbol,
            },
          })
            .exec(),
        },
        {
          upsert: true,
        },
      )
        .exec();
    }
    return null;
  }))
);

const importer = async () => {
  console.log('Converting CSV to JSON started.');
  const jsonData = await csv({
    delimiter: ';',
  })
    .fromFile('importer/data/INF_SN1st_2015_2016_Z.csv');
  await writeFile('importer/data/INF_SN1st_2015_2016_Z.json', JSON.stringify(jsonData), 'utf8');
  console.log('Converting CSV to JSON ended.');
  await mongoose.connect(process.env.DB_CONNECTION);
  console.log('Connected to database.');
  console.log('Importing data started.');
  const fileData = await readFile('importer/data/INF_SN1st_2015_2016_Z.json', 'utf8');
  const subjectsData = JSON.parse(fileData);
  await generateFieldsOfStudy(subjectsData);
  await generateSpecializations(subjectsData);
  await generateSubjects(subjectsData);
  console.log('Importing data ended.');
  await mongoose.connection.close();
  console.log('Connection ended.');
};

importer();
