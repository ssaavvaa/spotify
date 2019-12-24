export const styles = {
    colors: {
        font_main: "white",
        bg_main: "#222326",
        scnd_main: "#1DB954"
    },
    fonts: {
        main: 'Didact Gothic, sans-serif'
    },

    main_wrapper: {
        margin: "0 auto",
        maxWidth: 1400,
        padding: 20
    },

    get playListButton() {
        return {
            color: this.colors.font_main,
            fontFamily: this.fonts.main,
            backgroundColor: this.colors.scnd_main
        }
    },
    get searchButton() {
        return {
            color: this.colors.font_main,
            fontFamily: this.fonts.main,
            backgroundColor: this.colors.bg_main
        }
    },

    get main_heading() {
        return {
          
            fontFamily: this.fonts.main
        }
    },

    get playlist_heading() {
        return {
            fontFamily: this.fonts.main,
            color: this.colors.scnd_main
        }
    },

    get track_name() {
        return {
            fontFamily: this.fonts.main,
            color: this.colors.scnd_main
        }
    },

    get track_description() {
        return {
            fontFamily: this.fonts.main,
            color: this.colors.font_main
        }
    }


}