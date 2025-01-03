const womenMembers = ['Amel', 'Fanny', 'Talitha', 'Farha', 'Fenty', 'Fatra', 'Azka', 'Shelva', 'Sekar', 'Haifa']
const menMembers = ['Arya', 'Adit', 'Aar', 'Fadil', 'Yusa', 'Bajsan', 'Rai', 'Iki', 'Farid', 'Fajar', 'Kevin', 'Rafli', 'Akbar', 'Nabil', 'Isan', 'Dimas', 'Andi', 'Dhiya', 'Try', 'Angra']

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function generateTeams(membersPerTeam, teamType, kings = []) {
  let members
  switch (teamType) {
    case 'mensOnly':
      members = shuffleArray([...menMembers])
      break
    case 'womensOnly':
      members = shuffleArray([...womenMembers])
      break
    case 'mixed':
      members = shuffleArray([...menMembers, ...womenMembers])
      break
    default:
      throw new Error('Invalid team type')
  }

  const numberOfTeams = Math.ceil(members.length / membersPerTeam)
  let teams = Array.from({ length: numberOfTeams }, () => [])

  if (kings.length > 0) {
    // If kings are provided, use them as team leaders
    kings.forEach((king, index) => {
      if (index < teams.length) {
        teams[index].push(king)
        const memberIndex = members.indexOf(king)
        if (memberIndex > -1) {
          members.splice(memberIndex, 1)
        }
      }
    })
  }

  let teamIndex = 0
  while (members.length > 0) {
    if (teams[teamIndex].length < membersPerTeam) {
      if (teamType === 'mixed' && teams[teamIndex].length === membersPerTeam - 1) {
        // Ensure at least one woman in each team for mixed type
        const womanIndex = members.findIndex(member => womenMembers.includes(member))
        if (womanIndex !== -1 && !teams[teamIndex].some(member => womenMembers.includes(member))) {
          teams[teamIndex].push(members.splice(womanIndex, 1)[0])
        } else {
          teams[teamIndex].push(members.shift())
        }
      } else {
        teams[teamIndex].push(members.shift())
      }
    }
    teamIndex = (teamIndex + 1) % numberOfTeams
  }

  return teams
}

