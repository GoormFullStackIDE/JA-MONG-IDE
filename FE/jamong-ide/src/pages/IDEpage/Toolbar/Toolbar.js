import { useState } from "react";
import { ToolbarContainer, ToolbarIcon } from "./Toolbar.style";
import { GoFileCode, GoShareAndroid } from "react-icons/go";
import { LuSettings } from "react-icons/lu";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, MenuItem, Select, ThemeProvider, createTheme } from "@mui/material";

function Toolbar({ theme, onThemeChange, onTabChange }) {
    const [open, setOpen] = useState(false);
    const [changeTheme, setChangeTheme] = useState(theme);
    const [currentTab, setCurrentTab] = useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleThemeChange = (e) => {
        setChangeTheme(e.target.value);
        onThemeChange(e.target.value);
    }

    const handleOpenFileTree = () => {
        onTabChange(true);
        setCurrentTab(true);
    }

    const handleOpenInvite = () => {
        onTabChange(false);
        setCurrentTab(false);
    }

    const themes = {
        light: createTheme({
            components: {
                MuiBackdrop: {
                    styleOverrides: {
                        root: {
                            background: 'none',
                        }
                    }
                },
                MuiPaper: {
                    styleOverrides: {
                        root: {
                            width: '30vw',
                            height: '280px',
                            padding: '3%',
                            borderRadius: '10px',
                            backgroundColor: '#fff',
                        },
                    }
                },
                MuiTypography: {
                    styleOverrides: {
                        root: {
                            marginBottom: '20px',
                            fontSize: '26px',
                            color: '#000',
                        }
                    }
                },
                MuiDialogActions: {
                    styleOverrides: {
                        root: {
                            display: 'flex',
                            justifyContent: 'space-evenly',
                        }
                    }
                },
                MuiButton: {
                    styleOverrides: {
                        root: {
                            width: '200px',
                            height: '50px',
                            border: '2px solid #ddd',
                            borderRadius: '10px',
                            fontSize: '20px',
                            color: '#000',
                            '&:nth-child(2)': {
                                backgroundColor: '#ddd',
                                color: '#000',
                            }
                        },
                    }
                },
            }
        }),
        gray: createTheme({
            components: {
                MuiBackdrop: {
                    styleOverrides: {
                        root: {
                            background: 'none',
                        }
                    }
                },
                MuiPaper: {
                    styleOverrides: {
                        root: {
                            width: '30vw',
                            height: '280px',
                            padding: '3%',
                            borderRadius: '10px',
                            backgroundColor: '#c1c1c1',
                        },
                    }
                },
                MuiTypography: {
                    styleOverrides: {
                        root: {
                            marginBottom: '20px',
                            fontSize: '26px',
                            color: '#000',
                        }
                    }
                },
                MuiDialogActions: {
                    styleOverrides: {
                        root: {
                            display: 'flex',
                            justifyContent: 'space-evenly',
                        }
                    }
                },
                MuiButton: {
                    styleOverrides: {
                        root: {
                            width: '200px',
                            height: '50px',
                            border: '2px solid #999',
                            borderRadius: '10px',
                            fontSize: '20px',
                            color: '#000',
                            '&:nth-child(2)': {
                                backgroundColor: '#999',
                                color: '#000',
                            }
                        },
                    }
                },
            }
        }),
        dark: createTheme({
            components: {
                MuiBackdrop: {
                    styleOverrides: {
                        root: {
                            background: 'none',
                        }
                    }
                },
                MuiPaper: {
                    styleOverrides: {
                        root: {
                            width: '30vw',
                            height: '280px',
                            padding: '3%',
                            borderRadius: '10px',
                            backgroundColor: '#33373A',
                        },
                    }
                },
                MuiTypography: {
                    styleOverrides: {
                        root: {
                            marginBottom: '20px',
                            fontSize: '26px',
                            color: '#fff',
                        }
                    }
                },
                MuiDialogActions: {
                    styleOverrides: {
                        root: {
                            display: 'flex',
                            justifyContent: 'space-evenly',
                        }
                    }
                },
                MuiButton: {
                    styleOverrides: {
                        root: {
                            width: '200px',
                            height: '50px',
                            border: '2px solid #777',
                            borderRadius: '10px',
                            fontSize: '20px',
                            color: '#fff',
                            '&:nth-child(2)': {
                                backgroundColor: '#777',
                                color: '#000',
                            }
                        },
                    }
                },
            }
        }),
        jamong: createTheme({
            components: {
                MuiBackdrop: {
                    styleOverrides: {
                        root: {
                            background: 'none',
                        }
                    }
                },
                MuiPaper: {
                    styleOverrides: {
                        root: {
                            width: '30vw',
                            height: '280px',
                            padding: '3%',
                            borderRadius: '10px',
                            backgroundColor: '#FFEBE5',
                        },
                    }
                },
                MuiTypography: {
                    styleOverrides: {
                        root: {
                            marginBottom: '20px',
                            fontSize: '26px',
                            color: '#000',
                        }
                    }
                },
                MuiDialogActions: {
                    styleOverrides: {
                        root: {
                            display: 'flex',
                            justifyContent: 'space-evenly',
                        }
                    }
                },
                MuiButton: {
                    styleOverrides: {
                        root: {
                            width: '200px',
                            height: '50px',
                            border: '2px solid #FF9B8D',
                            borderRadius: '10px',
                            fontSize: '20px',
                            color: '#000',
                            '&:nth-child(2)': {
                                backgroundColor: '#FF9B8D',
                                color: '#000',
                            }
                        },
                    }
                },
            }
        }),
    }

    const themeSeletortheme = {
        light: createTheme({
            components: {
                MuiFormControl: {
                    styleOverrides: {
                        root: {
                            width: '100%',
                            border: '1px solid #777',
                            borderRadius: '5px',
                            outline: 'none',
                            boxSizing: 'border-box',
                        }
                    }
                },
                MuiInputBase: {
                    styleOverrides: {
                        root: {
                            color: '#000',
                        }
                    }
                },
                MuiPaper: {
                    styleOverrides: {
                        root: {
                            width: '27vw',
                            background: '#ddd',
                            color: '#000',
                        }
                    }
                }
            }
        }),
        gray: createTheme({
            components: {
                MuiFormControl: {
                    styleOverrides: {
                        root: {
                            width: '100%',
                            border: '1px solid #777',
                            borderRadius: '5px',
                            outline: 'none',
                            boxSizing: 'border-box',
                        }
                    }
                },
                MuiInputBase: {
                    styleOverrides: {
                        root: {
                            color: '#000',
                        }
                    }
                },
                MuiPaper: {
                    styleOverrides: {
                        root: {
                            width: '27vw',
                            background: '#8d8d8d',
                            color: '#000',
                        }
                    }
                }
            }
        }),
        dark: createTheme({
            components: {
                MuiFormControl: {
                    styleOverrides: {
                        root: {
                            width: '100%',
                            border: '1px solid #777',
                            borderRadius: '5px',
                            outline: 'none',
                            boxSizing: 'border-box',
                        }
                    }
                },
                MuiInputBase: {
                    styleOverrides: {
                        root: {
                            color: '#fff',
                        }
                    }
                },
                MuiPaper: {
                    styleOverrides: {
                        root: {
                            width: '27vw',
                            background: '#1e1e1e',
                            color: '#fff',
                        }
                    }
                }
            }
        }),
        jamong: createTheme({
            components: {
                MuiFormControl: {
                    styleOverrides: {
                        root: {
                            width: '100%',
                            border: '1px solid #FF9B8D',
                            borderRadius: '5px',
                            outline: 'none',
                            boxSizing: 'border-box',
                        }
                    }
                },
                MuiInputBase: {
                    styleOverrides: {
                        root: {
                            color: '#000',
                        }
                    }
                },
                MuiPaper: {
                    styleOverrides: {
                        root: {
                            width: '27vw',
                            background: '#FFCCBC',
                            color: '#000',
                        }
                    }
                }
            }
        }),
    }

    // 탭으로 변경

    return (
        <ToolbarContainer>
            <ToolbarIcon className={`${currentTab ? 'focused' : ''}`} onClick={handleOpenFileTree}>
                <GoFileCode size="25px" />
                {/* 파일 트리 구조 컴포넌트 */}
            </ToolbarIcon>
            <ToolbarIcon onClick={handleClickOpen}>
                <LuSettings size="25px" />
            </ToolbarIcon>
            <ThemeProvider theme={themes[changeTheme]}>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>테마 설정</DialogTitle>
                    <DialogContent>
                        <ThemeProvider theme={themeSeletortheme[changeTheme]}>
                            <FormControl>
                                <Select defaultValue={changeTheme} value={changeTheme} onChange={handleThemeChange}>
                                    <MenuItem value="jamong">Jamong Theme</MenuItem>
                                    <MenuItem value="light">Light Theme</MenuItem>
                                    <MenuItem value="gray">Gray Theme</MenuItem>
                                    <MenuItem value="dark">Dark Theme</MenuItem>
                                </Select>
                            </FormControl>
                        </ThemeProvider>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>취소</Button>
                        <Button onClick={handleClose}>확인</Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
            <ToolbarIcon className={`${currentTab ? '' : 'focused'}`} onClick={handleOpenInvite}>
                <GoShareAndroid size="25px" />
                {/* 초대 */}
            </ToolbarIcon>
        </ToolbarContainer>
    );
}

export default Toolbar;