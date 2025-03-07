document.addEventListener('DOMContentLoaded', () => {
    const courtsTableBody = document.getElementById('courtsTableBody');
    const searchInput = document.getElementById('searchInput');

    const courtData = [
        {
            state: "Dallas",
            city: "Brown",
            courtName: "None",
            phoneNumber: "Pending",
            skypeLink: "skype:+0000000000?call"
        },
        {
            state: "Dallas",
            city: " Davis-Gumbs ",
            courtName: "Wanda Brown ",
            phoneNumber: "214-761-4119",
            skypeLink: "skype:+2147614119?call"
        },
        {
            state: "Dallas",
            city: "Dvorak",
            courtName: "Vanessa McDonald ",
            phoneNumber: "713-995-3925",
            skypeLink: "skype:+7139953925?call"
        },
        {
            state: "Dallas",
            city: "Ellison",
            courtName: "Grace Goodrum",
            phoneNumber: "214-761-5320",
            skypeLink: "skype:+2147615320?call"
        },
        {
            state: "Dallas",
            city: "Irwin",
            courtName: "not available",
            phoneNumber: "",
            skypeLink: "skype:+phonenumber}?call"
        },
        {
            state: "Dallas",
            city: "Nugent",
            courtName: "Ofelia Tonche",
            phoneNumber: "214-761-5327",
            skypeLink: "skype:+2147615327?call"
        },
        {
            state: "Dallas",
            city: "Ozmun",
            courtName: "Nicole Hooper",
            phoneNumber: "214-761-4134",
            skypeLink: "skype:+2147614134?call"
        },
        {
            state: "Dallas",
            city: "Sims",
            courtName: "Sonia Pereda",
            phoneNumber: "214-761-4132",
            skypeLink: "skype:+2147614132?call"
        },
        {
            state: "Dallas",
            city: "Thielemann",
            courtName: "Stephanie Alexander",
            phoneNumber: "214-761-5323",
            skypeLink: "skype:+2147615323?call"
        },
        {
            state: "Dallas",
            city: "Winfield ",
            courtName: "Thirza Rodriguez",
            phoneNumber: "714-481-1321",
            skypeLink: "skype:+7144811321?call"
        },
        {
            state: "Atlanta",
            city: "Bell",
            courtName: "Not Aveilable",
            phoneNumber: "Pending",
            skypeLink: "skype:+00000000?call"
        },
        {
            state: "Atlanta",
            city: "Coaxum",
            courtName: "not available",
            phoneNumber: "pending",
            skypeLink: "skype:+00000000?call"
        },
        {
            state: "Atlanta",
            city: "Doughty",
            courtName: "Carmella Castillo",
            phoneNumber: "404-554-9425",
            skypeLink: "skype:+4045549425?call"
        },
        {
            state: "Atlanta",
            city: "Fisher",
            courtName: "Torsha Douglas",
            phoneNumber: "404-554-9404 ",
            skypeLink: "skype:+4045549404 ?call"
        },
        {
            state: "Atlanta",
            city: "Haer",
            courtName: "Not Available",
            phoneNumber: "peding",
            skypeLink: "skype:+00000000?call"
        },
        {
            state: "Atlanta",
            city: "Maldonado",
            courtName: "Ernest Jay Little",
            phoneNumber: "404-554-9419",
            skypeLink: "skype:+4045549419?call"
        },
        {
            state: "Atlanta",
            city: "Murray",
            courtName: "Not Available",
            phoneNumber: "pending",
            skypeLink: "skype:+00000000?call"
        },
        {
            state: "Atlanta",
            city: "Smikle",
            courtName: "Not Available",
            phoneNumber: "pending",
            skypeLink: "skype:+00000000?call"
        },
        {
            state: "Atlanta",
            city: "Taylor",
            courtName: "Prasanth Nair",
            phoneNumber: "404-554-9413",
            skypeLink: "skype:+4045549413?call"
        },
        {
            state: "San Francisco",
            city: "Brasil",
            courtName: "Not Available",
            phoneNumber: "pending",
            skypeLink: "skype:+00000000?call"
        },
        {
            state: "San Francisco",
            city: "Chen",
            courtName: "Not Available",
            phoneNumber: "pending",
            skypeLink: "skype:+00000000?call"
        },
        {
            state: "San Francisco",
            city: "Davis",
            courtName: "Not Available",
            phoneNumber: "pending",
            skypeLink: "skype:+00000000?call"
        },
        {
            state: "San Francisco",
            city: "Deiss",
            courtName: "Not Available",
            phoneNumber: "pending",
            skypeLink: "skype:+00000000?call"
        },
        {
            state: "San Francisco",
            city: "Dillon",
            courtName: "Not Available",
            phoneNumber: "pending",
            skypeLink: "skype:+00000000?call"
        },
        {
            state: "San Francisco",
            city: "Dinh",
            courtName: "Not Available",
            phoneNumber: "pending",
            skypeLink: "skype:+00000000?call"
        },
        {
            state: "San Francisco",
            city: "Gambill",
            courtName: "Kevin Calkins",
            phoneNumber: "415-315-4675",
            skypeLink: "skype:+4153154675?call"
        },
        {
            state: "San Francisco",
            city: "George",
            courtName: "Gary Quach",
            phoneNumber: "415-705-0145",
            skypeLink: "skype:+4157050145?call"
        },
        {
            state: "San Francisco",
            city: "Gordon",
            courtName: "Brian Lee",
            phoneNumber: "415-315-4583",
            skypeLink: "skype:+4153154583?call"
        },
        {
            state: "San Francisco",
            city: "Greene ",
            courtName: "Gloria Porras",
            phoneNumber: "415-315-4658",
            skypeLink: "skype:+4153154658?call"
        },
        {
            state: "San Francisco",
            city: "Johnson",
            courtName: "Alice Gumaru",
            phoneNumber: "415-315-4607",
            skypeLink: "skype:+4153154607?call"
        },
        {
            state: "San Francisco",
            city: "Kirchner",
            courtName: "Carina Zaragoza",
            phoneNumber: "415-315-4669",
            skypeLink: "skype:+4153154669?call"
        },
        {
            state: "San Francisco",
            city: "Levine",
            courtName: "Veronica Dang",
            phoneNumber: "415-315-4621",
            skypeLink: "skype:+4153154621?call"
        },
        {
            state: "San Francisco",
            city: "O’Brien",
            courtName: "Silvia Beel",
            phoneNumber: "415-262-3850",
            skypeLink: "skype:+4152623850?call"
        },
        {
            state: "San Francisco",
            city: "Park",
            courtName: "Emmanuel Rosal ",
            phoneNumber: "415-262-3852",
            skypeLink: "skype:+4152623852?call"
        },
        {
            state: "San Francisco",
            city: "Savage",
            courtName: "Elizabeth Margolis",
            phoneNumber: "415-315-4635",
            skypeLink: "skype:+4153154635?call"
        },
        {
            state: "San Francisco",
            city: "Schulz",
            courtName: "Lizelle Figueroa ",
            phoneNumber: "415-315-4677",
            skypeLink: "skype:+4153154677?call"
        },
        {
            state: "San Francisco",
            city: "Seminerio",
            courtName: "Doumao Tai",
            phoneNumber: "415-315-4673",
            skypeLink: "skype:+4153154673?call"
        },
        {
            state: "San Francisco",
            city: "Slayton",
            courtName: "Not Available",
            phoneNumber: "pending",
            skypeLink: "skype:+00000000?call"
        },
        {
            state: "San Francisco",
            city: "Swink",
            courtName: "Nicole Symkowick",
            phoneNumber: "415-315-4593",
            skypeLink: "skype:+4153154593?call"
        },
        {
            state: "San Francisco",
            city: "Vigil",
            courtName: "Not Available",
            phoneNumber: "pending",
            skypeLink: "skype:+00000000?call"
        },
        {
            state: "Seattle",
            city: "Evans",
            courtName: "Kim Libby",
            phoneNumber: " 206-342-7211",
            skypeLink: "skype:+ 2063427211?call"
        },
        {
            state: "Seattle",
            city: "Johnson",
            courtName: "Not Available",
            phoneNumber: "206-342-7200",
            skypeLink: "skype:+2063427200?call"
        },
        {
            state: "Seattle",
            city: "McSeveney ",
            courtName: "Pat McRae",
            phoneNumber: "206-342-7209",
            skypeLink: "skype:+2063427209?call"
        },
        {
            state: "Seattle",
            city: "Parchert",
            courtName: "Tina Guinto",
            phoneNumber: " 206-342-7213",
            skypeLink: "skype:+ 2063427213?call"
        },
        {
            state: "Seattle",
            city: "Reyes",
            courtName: "Not Available",
            phoneNumber: "Pending",
            skypeLink: "skype:+00000000?call"
        },
        {
            state: "Seattle",
            city: "Ken Sogabe ",
            courtName: "Alfonso Bautista",
            phoneNumber: "206-342-7210",
            skypeLink: "skype:+2063427210?call"
        },
        {
            state: "Seattle",
            city: "Tisocco",
            courtName: "Not Available",
            phoneNumber: "Pending",
            skypeLink: "skype:+00000000?call"
        },
        {
            state: "Seattle",
            city: "Windrow",
            courtName: "Sernya Codd",
            phoneNumber: "Example",
            skypeLink: "skype:+ 2063427248?call"
        },
        {
            state: "Concord",
            city: "Butler",
            courtName: "Amandy Liang ",
            phoneNumber: "415-315-4627",
            skypeLink: "skype:+4153154627?call"
        },
        {
            state: "Concord",
            city: "Chamberlin",
            courtName: "Not Available",
            phoneNumber: "Pending",
            skypeLink: "skype:+00000000?call"
        },
        {
            state: "Concord",
            city: "Eichenberger",
            courtName: "Not Available",
            phoneNumber: "Pending",
            skypeLink: "skype:+00000000?call"
        },
        {
            state: "Concord",
            city: "Lilien",
            courtName: "Not Available",
            phoneNumber: "Pending",
            skypeLink: "skype:+00000000?call"
        },
        {
            state: "Concord",
            city: "Nava",
            courtName: "Not Available",
            phoneNumber: "Pending",
            skypeLink: "skype:+00000000?call"
        },
        {
            state: "Concord",
            city: "Price",
            courtName: "Magaly Velasco-Escobar",
            phoneNumber: "415-705-0139",
            skypeLink: "skype:+4157050139?call"
        },
        {
            state: "Concord",
            city: "Star",
            courtName: "Tanner Robison",
            phoneNumber: "415-315-4661",
            skypeLink: "skype:+4153154661?call"
        },
        {
            state: "Concord",
            city: "Stender",
            courtName: "Not Available",
            phoneNumber: "Pending",
            skypeLink: "skype:+00000000?call"
        },
        {
            state: "Concord",
            city: "Torres",
            courtName: "Not Available",
            phoneNumber: "Pending",
            skypeLink: "skype:+00000000?call"
        },
        {
            state: "Concord",
            city: "Wilson",
            courtName: "Not Available",
            phoneNumber: "Pending",
            skypeLink: "skype:+00000000?call"
        },
        {
            state: "Concord",
            city: "Example",
            courtName: "Example",
            phoneNumber: "Example",
            skypeLink: "skype:+00000000?call"
        },


    ];

    function renderCourts(courts) {
        courtsTableBody.innerHTML = '';
        courts.forEach(court => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${court.state}</td>
                <td>${court.city}</td>
                <td>${court.courtName}</td>
                <td>${court.phoneNumber}</td>
                <td>
                    <button class="call-btn" onclick="window.open('${court.skypeLink}', '_blank')">
                        <i class="fas fa-phone"></i> Call
                    </button>
                </td>
            `;
            
            courtsTableBody.appendChild(row);
        });
    }

    function searchCourts() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredCourts = courtData.filter(court => 
            court.state.toLowerCase().includes(searchTerm) ||
            court.city.toLowerCase().includes(searchTerm) ||
            court.phoneNumber.includes(searchTerm)
        );
        renderCourts(filteredCourts);
    }

    // Initial render
    renderCourts(courtData);

    // Add search event listener
    searchInput.addEventListener('input', searchCourts);
});