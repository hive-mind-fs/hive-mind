const dummyRounds = [
  {
    letters: 'AEGLOSV',
    winnerId: 32,
    id: 1,
    pangramList: '{AASVOGEL,AASVOGELS,LOVAGES}',
    coreLetter: 'V',
    possiblePoints: 913
  },
  {
    letters: 'ABCILNT',
    winnerId: 27,
    id: 2,
    pangramList: '{ABACTINAL}',
    coreLetter: 'L',
    possiblePoints: 917
  },
  {
    letters: 'ABCILNT',
    winnerId: 13,
    id: 3,
    pangramList: '{ABACTINAL}',
    coreLetter: 'N',
    possiblePoints: 841
  },
  {
    letters: 'ABCILNT',
    winnerId: 38,
    id: 4,
    pangramList: '{ABACTINAL}',
    coreLetter: 'T',
    possiblePoints: 908
  },
  {
    letters: 'ABGHINS',
    winnerId: 1,
    id: 5,
    pangramList: '{ABASHING,BANISHING,BASHING,BASHINGS}',
    coreLetter: 'H',
    possiblePoints: 839
  },
  {
    letters: 'ABEIRTV',
    winnerId: 45,
    id: 6,
    pangramList:
      '{ABBREVIATE,ARBITRATIVE,BIVARIATE,BREVIATE,REBARBATIVE,REVERBERATIVE,REVIBRATE,VIBRATE,VIBRATIVE}',
    coreLetter: 'V',
    possiblePoints: 909
  },
  {
    letters: 'ABCDEIL',
    winnerId: 32,
    id: 7,
    pangramList: '{ABDICABLE,BACILLICIDE,CEBADILLA,DECIDABLE}',
    coreLetter: 'C',
    possiblePoints: 846
  },
  {
    letters: 'ABCDINT',
    winnerId: 49,
    id: 8,
    pangramList: '{ABDICANT}',
    coreLetter: 'A',
    possiblePoints: 898
  },
  {
    letters: 'ABCDEIT',
    winnerId: 24,
    id: 9,
    pangramList: '{ABDICATE,ABDICATED,DIABETIC}',
    coreLetter: 'I',
    possiblePoints: 918
  },
  {
    letters: 'ABDEMNO',
    winnerId: 11,
    id: 10,
    pangramList: '{ABDOMEN,BEMOANED,ENDAMOEBA,ENDAMOEBAE}',
    coreLetter: 'B',
    possiblePoints: 902
  },
  {
    letters: 'ABDIMNO',
    winnerId: 37,
    id: 11,
    pangramList: '{ABDOMINA,BONDMAID}',
    coreLetter: 'A',
    possiblePoints: 905
  },
  {
    letters: 'ABDIMNO',
    winnerId: 35,
    id: 12,
    pangramList: '{ABDOMINA,BONDMAID}',
    coreLetter: 'N',
    possiblePoints: 843
  },
  {
    letters: 'ABCDETU',
    winnerId: 25,
    id: 13,
    pangramList: '{ABDUCTED,ABDUCTEE}',
    coreLetter: 'A',
    possiblePoints: 837
  },
  {
    letters: 'ABCDSTU',
    winnerId: 1,
    id: 14,
    pangramList: '{ABDUCTS}',
    coreLetter: 'S',
    possiblePoints: 875
  },
  {
    letters: 'ABEGINT',
    winnerId: 38,
    id: 15,
    pangramList: '{ABETTING,ABNEGATING,BATTENING,BEATING,BENIGNANT}',
    coreLetter: 'B',
    possiblePoints: 863
  },
  {
    letters: 'ABCDEIN',
    winnerId: 45,
    id: 16,
    pangramList: '{ABIDANCE,CABINED}',
    coreLetter: 'I',
    possiblePoints: 847
  },
  {
    letters: 'ABDGINS',
    winnerId: 7,
    id: 17,
    pangramList: '{ABIDINGS,BANDAGINGS,BANDINGS,DISBANDING,SANDBAGGING}',
    coreLetter: 'D',
    possiblePoints: 911
  },
  {
    letters: 'ABDEJRU',
    winnerId: 14,
    id: 18,
    pangramList: '{ABJURED}',
    coreLetter: 'A',
    possiblePoints: 909
  },
  {
    letters: 'ABGILNT',
    winnerId: 17,
    id: 19,
    pangramList:
      '{ABLATING,BALLANTING,BALLATING,BANGTAIL,BANTLING,BATTILLING,BATTLING,BLATING,BLATTING,LIBATING,TABLING}',
    coreLetter: 'B',
    possiblePoints: 891
  },
  {
    letters: 'ABEILTV',
    winnerId: 46,
    id: 20,
    pangramList: '{ABLATIVE,BABBLATIVE,BIVALVATE,EVITABLE,VITIABLE}',
    coreLetter: 'B',
    possiblePoints: 908
  },
  {
    letters: 'ABDEGNT',
    winnerId: 42,
    id: 21,
    pangramList: '{ABNEGATED}',
    coreLetter: 'T',
    possiblePoints: 911
  },
  {
    letters: 'ABHILOS',
    winnerId: 42,
    id: 22,
    pangramList: '{ABOLISH}',
    coreLetter: 'B',
    possiblePoints: 916
  },
  {
    letters: 'ABHILOS',
    winnerId: 25,
    id: 23,
    pangramList: '{ABOLISH}',
    coreLetter: 'H',
    possiblePoints: 836
  },
  {
    letters: 'ABHILOS',
    winnerId: 10,
    id: 24,
    pangramList: '{ABOLISH}',
    coreLetter: 'I',
    possiblePoints: 867
  },
  {
    letters: 'ABCDENO',
    winnerId: 32,
    id: 25,
    pangramList: '{ABONDANCE,BEACONED}',
    coreLetter: 'A',
    possiblePoints: 914
  },
  {
    letters: 'ABCDENO',
    winnerId: 26,
    id: 26,
    pangramList: '{ABONDANCE,BEACONED}',
    coreLetter: 'O',
    possiblePoints: 901
  },
  {
    letters: 'ABDENOU',
    winnerId: 21,
    id: 27,
    pangramList: '{ABOUNDED}',
    coreLetter: 'N',
    possiblePoints: 897
  },
  {
    letters: 'ABDNOSU',
    winnerId: 18,
    id: 28,
    pangramList: '{ABOUNDS,BAUSOND}',
    coreLetter: 'B',
    possiblePoints: 843
  },
  {
    letters: 'ABDNOSU',
    winnerId: 26,
    id: 29,
    pangramList: '{ABOUNDS,BAUSOND}',
    coreLetter: 'N',
    possiblePoints: 861
  },
  {
    letters: 'ABDNOSU',
    winnerId: 47,
    id: 30,
    pangramList: '{ABOUNDS,BAUSOND}',
    coreLetter: 'O',
    possiblePoints: 844
  },
  {
    letters: 'ABCHIRS',
    winnerId: 22,
    id: 31,
    pangramList: '{ABRACHIAS}',
    coreLetter: 'B',
    possiblePoints: 907
  },
  {
    letters: 'ABCIKOR',
    winnerId: 46,
    id: 32,
    pangramList: '{ABRICOCK}',
    coreLetter: 'A',
    possiblePoints: 849
  },
  {
    letters: 'ABGORST',
    winnerId: 26,
    id: 33,
    pangramList: '{ABROGATORS,BOGARTS,BOGGARTS,BOTARGOS,BOTTARGAS}',
    coreLetter: 'G',
    possiblePoints: 835
  },
  {
    letters: 'ABCGINS',
    winnerId: 5,
    id: 34,
    pangramList: '{ABSCISING,SCABBING}',
    coreLetter: 'B',
    possiblePoints: 866
  },
  {
    letters: 'ABHINST',
    winnerId: 48,
    id: 35,
    pangramList: '{ABSINTH,ABSINTHS,HABITANS,HABITANTS,INHABITANTS,INHABITS}',
    coreLetter: 'B',
    possiblePoints: 861
  },
  {
    letters: 'ABCDENU',
    winnerId: 21,
    id: 36,
    pangramList: '{ABUNDANCE}',
    coreLetter: 'D',
    possiblePoints: 910
  },
  {
    letters: 'ABLOSTV',
    winnerId: 29,
    id: 37,
    pangramList: '{ABVOLTS}',
    coreLetter: 'B',
    possiblePoints: 839
  },
  {
    letters: 'ABEGINY',
    winnerId: 27,
    id: 38,
    pangramList: '{ABYEING,EBAYING}',
    coreLetter: 'G',
    possiblePoints: 836
  },
  {
    letters: 'ACEHLNP',
    winnerId: 44,
    id: 39,
    pangramList: '{ACALEPHAN,ENCEPHALA,EPENCEPHALA,PLANCHE}',
    coreLetter: 'L',
    possiblePoints: 898
  },
  {
    letters: 'ACHNSTU',
    winnerId: 50,
    id: 40,
    pangramList: '{ACANTHUS,CANTHUS,CHAUNTS,STAUNCH}',
    coreLetter: 'H',
    possiblePoints: 857
  },
  {
    letters: 'ACHNSTU',
    winnerId: 5,
    id: 41,
    pangramList: '{ACANTHUS,CANTHUS,CHAUNTS,STAUNCH}',
    coreLetter: 'U',
    possiblePoints: 836
  },
  {
    letters: 'ACDEGIN',
    winnerId: 3,
    id: 42,
    pangramList: '{ACCEDING,ACCENDING,ACCINGED,CADENCING,INCAGED,INDIGNANCE}',
    coreLetter: 'C',
    possiblePoints: 845
  },
  {
    letters: 'ACELNTU',
    winnerId: 36,
    id: 43,
    pangramList:
      '{ACCENTUAL,ANTELUCAN,ANUCLEATE,CANNULATE,CANULATE,CATENULATE,ENUCLEATE,LACUNATE,NUCLEATE,TENACULA,TENTACULA,TENTACULATE}',
    coreLetter: 'U',
    possiblePoints: 920
  },
  {
    letters: 'ACENPTY',
    winnerId: 6,
    id: 44,
    pangramList: '{ACCEPTANCY,APPETENCY,PATENCY}',
    coreLetter: 'E',
    possiblePoints: 912
  },
  {
    letters: 'ACENPTY',
    winnerId: 32,
    id: 45,
    pangramList: '{ACCEPTANCY,APPETENCY,PATENCY}',
    coreLetter: 'N',
    possiblePoints: 848
  },
  {
    letters: 'ACENPTY',
    winnerId: 1,
    id: 46,
    pangramList: '{ACCEPTANCY,APPETENCY,PATENCY}',
    coreLetter: 'T',
    possiblePoints: 849
  },
  {
    letters: 'ACILPRT',
    winnerId: 50,
    id: 47,
    pangramList:
      '{ACCIPITRAL,CLIPART,PARALLACTIC,PARALLACTICAL,PARATACTICAL,PARTICIPIAL,PIRATICAL,PRACTICAL}',
    coreLetter: 'P',
    possiblePoints: 916
  },
  {
    letters: 'ACDELOY',
    winnerId: 49,
    id: 48,
    pangramList: '{ACCLOYED}',
    coreLetter: 'A',
    possiblePoints: 891
  },
  {
    letters: 'ACDEMOT',
    winnerId: 19,
    id: 49,
    pangramList: '{ACCOMMODATE,ACCOMMODATED,TOMCATTED}',
    coreLetter: 'A',
    possiblePoints: 899
  },
  {
    letters: 'ACDEMOT',
    winnerId: 19,
    id: 50,
    pangramList: '{ACCOMMODATE,ACCOMMODATED,TOMCATTED}',
    coreLetter: 'D',
    possiblePoints: 917
  }
];

module.exports = dummyRounds;
